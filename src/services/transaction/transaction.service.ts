import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionType, TransactionStatus } from '../../common/interfaces/transaction.interface';
import { CreateTransactionDto, TransactionResponseDto } from '../../common/dto/transaction.dto';
import { PrismaService } from '../../database/postgres/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<TransactionResponseDto> {
    const { fromAccountId, toAccountId, amount, currency, type, description } = createTransactionDto;

    // Validate transaction based on type
    switch (type) {
      case TransactionType.TRANSFER:
        if (!fromAccountId || !toAccountId) {
          throw new BadRequestException('Transfer transactions require both fromAccountId and toAccountId');
        }
        break;
      case TransactionType.DEPOSIT:
        if (!toAccountId) {
          throw new BadRequestException('Deposit transactions require toAccountId');
        }
        break;
      case TransactionType.WITHDRAWAL:
        if (!fromAccountId) {
          throw new BadRequestException('Withdrawal transactions require fromAccountId');
        }
        break;
      // Add other transaction type validations as needed
    }

    // Generate reference number
    const reference = this.generateReferenceNumber();

    // Create transaction using Prisma transaction to ensure atomicity
    return await this.prisma.$transaction(async (prisma) => {
      // Check if accounts exist and have sufficient funds
      if (fromAccountId) {
        const fromAccount = await prisma.account.findUnique({ where: { id: fromAccountId } });
        if (!fromAccount) {
          throw new NotFoundException(`Account with ID ${fromAccountId} not found`);
        }
        
        // Check for sufficient funds
        if (fromAccount.balance < amount) {
          throw new BadRequestException('Insufficient funds');
        }
        
        // Check currency match
        if (fromAccount.currency !== currency) {
          throw new BadRequestException('Currency mismatch');
        }
      }
      
      if (toAccountId) {
        const toAccount = await prisma.account.findUnique({ where: { id: toAccountId } });
        if (!toAccount) {
          throw new NotFoundException(`Account with ID ${toAccountId} not found`);
        }
        
        // Check currency match
        if (toAccount.currency !== currency) {
          throw new BadRequestException('Currency mismatch');
        }
      }
      
      // Create the transaction
      const transaction = await prisma.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          currency,
          type,
          status: TransactionStatus.COMPLETED, // Assume successful for now
          reference,
          description,
        },
      });
      
      // Update account balances
      if (fromAccountId) {
        await prisma.account.update({
          where: { id: fromAccountId },
          data: { balance: { decrement: amount } },
        });
      }
      
      if (toAccountId) {
        await prisma.account.update({
          where: { id: toAccountId },
          data: { balance: { increment: amount } },
        });
      }
      
      return transaction;
    });
  }

  async findAll(
    accountId?: string,
    userId?: string,
    page = 1,
    limit = 10,
  ): Promise<TransactionResponseDto[]> {
    const skip = (page - 1) * limit;
    
    let where = {};
    
    if (accountId) {
      where = {
        OR: [
          { fromAccountId: accountId },
          { toAccountId: accountId },
        ],
      };
    }
    
    if (userId) {
      const userAccounts = await this.prisma.account.findMany({
        where: { userId },
        select: { id: true },
      });
      
      const accountIds = userAccounts.map(account => account.id);
      
      where = {
        OR: [
          { fromAccountId: { in: accountIds } },
          { toAccountId: { in: accountIds } },
        ],
      };
    }
    
    const transactions = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        fromAccount: true,
        toAccount: true,
      },
    });
    
    return transactions;
  }

  async findOne(id: string): Promise<TransactionResponseDto> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        fromAccount: true,
        toAccount: true,
      },
    });
    
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    
    return transaction;
  }

  private generateReferenceNumber(): string {
    // Generate a reference number for transaction tracing
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TRX${timestamp}${random}`;
  }
}

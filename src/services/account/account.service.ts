import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AccountType, AccountStatus } from '../../common/interfaces/account.interface';
import { CreateAccountDto, UpdateAccountDto, AccountResponseDto } from '../../common/dto/account.dto';
import { PrismaService } from '../../database/postgres/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
    // Generate a random account number
    const accountNumber = this.generateAccountNumber();

    // If this account is set as default, unset any other default accounts for this user
    if (createAccountDto.isDefault) {
      await this.prisma.account.updateMany({
        where: { userId: createAccountDto.userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create new account
    const newAccount = await this.prisma.account.create({
      data: {
        userId: createAccountDto.userId,
        accountNumber,
        accountType: createAccountDto.accountType,
        balance: 0,
        currency: createAccountDto.currency,
        status: AccountStatus.ACTIVE,
        isDefault: createAccountDto.isDefault || false,
      },
    });

    return newAccount;
  }

  async findAll(userId?: string, page = 1, limit = 10): Promise<AccountResponseDto[]> {
    const skip = (page - 1) * limit;
    
    const where = userId ? { userId } : {};
    
    const accounts = await this.prisma.account.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    
    return accounts;
  }

  async findOne(id: string): Promise<AccountResponseDto> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });
    
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountResponseDto> {
    // If setting as default, unset other default accounts
    if (updateAccountDto.isDefault) {
      const account = await this.prisma.account.findUnique({
        where: { id },
      });
      
      if (!account) {
        throw new NotFoundException(`Account with ID ${id} not found`);
      }
      
      await this.prisma.account.updateMany({
        where: { userId: account.userId, isDefault: true },
        data: { isDefault: false },
      });
    }
    
    const updatedAccount = await this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
    
    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    
    return updatedAccount;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.account.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
  }

  private generateAccountNumber(): string {
    // Generate a random 10-digit account number
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreditCardStatus, LoanStatus, LoanType } from '../../common/interfaces/credit.interface';
import { 
  CreateCreditCardDto, 
  CreditCardResponseDto, 
  CreateLoanApplicationDto,
  LoanResponseDto
} from '../../common/dto/credit.dto';
import { PrismaService } from '../../database/postgres/prisma.service';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async createCreditCard(createCreditCardDto: CreateCreditCardDto): Promise<CreditCardResponseDto> {
    // Generate a random card number
    const cardNumber = this.generateCardNumber();
    
    // Set expiry date 3 years from now
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 3);
    
    // Create new credit card
    const newCreditCard = await this.prisma.creditCard.create({
      data: {
        userId: createCreditCardDto.userId,
        cardNumber,
        cardType: createCreditCardDto.cardType,
        expiryDate,
        creditLimit: createCreditCardDto.creditLimit,
        availableCredit: createCreditCardDto.creditLimit, // Initially available credit equals credit limit
        status: CreditCardStatus.ACTIVE,
      },
    });
    
    return newCreditCard;
  }

  async findAllCreditCards(userId?: string): Promise<CreditCardResponseDto[]> {
    const where = userId ? { userId } : {};
    
    const creditCards = await this.prisma.creditCard.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return creditCards;
  }

  async findOneCreditCard(id: string): Promise<CreditCardResponseDto> {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: { id },
    });
    
    if (!creditCard) {
      throw new NotFoundException(`Credit card with ID ${id} not found`);
    }
    
    return creditCard;
  }

  async createLoanApplication(createLoanApplicationDto: CreateLoanApplicationDto): Promise<LoanResponseDto> {
    // Calculate interest rate based on loan type
    const interestRate = this.calculateInterestRate(createLoanApplicationDto.loanType);
    
    // Set start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + createLoanApplicationDto.termMonths);
    
    // Create new loan application
    const newLoan = await this.prisma.loan.create({
      data: {
        userId: createLoanApplicationDto.userId,
        loanType: createLoanApplicationDto.loanType,
        amount: createLoanApplicationDto.amount,
        interestRate,
        termMonths: createLoanApplicationDto.termMonths,
        status: LoanStatus.PENDING, // Initial status is pending for review
        startDate,
        endDate,
      },
    });
    
    return newLoan;
  }

  async findAllLoans(userId?: string): Promise<LoanResponseDto[]> {
    const where = userId ? { userId } : {};
    
    const loans = await this.prisma.loan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return loans;
  }

  async findOneLoan(id: string): Promise<LoanResponseDto> {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
    });
    
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    
    return loan;
  }

  private generateCardNumber(): string {
    // Generate a random 16-digit credit card number
    const prefix = '4'; // Visa-like
    let number = prefix;
    
    for (let i = 0; i < 15; i++) {
      number += Math.floor(Math.random() * 10).toString();
    }
    
    return number;
  }

  private calculateInterestRate(loanType: LoanType): number {
    // Calculate interest rate based on loan type
    switch (loanType) {
      case LoanType.PERSONAL:
        return 12.5;
      case LoanType.HOME:
        return 5.25;
      case LoanType.AUTO:
        return 7.5;
      case LoanType.EDUCATION:
        return 4.75;
      case LoanType.BUSINESS:
        return 9.25;
      default:
        return 10.0;
    }
  }
}

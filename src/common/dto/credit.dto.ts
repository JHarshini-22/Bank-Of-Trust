import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDate, IsOptional, Min } from 'class-validator';
import { LoanType, LoanStatus, CreditCardStatus } from '../interfaces/credit.interface';

export class CreateCreditCardDto {
  @ApiProperty({ description: 'User ID who owns this credit card' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Visa', description: 'Type of credit card' })
  @IsString()
  @IsNotEmpty()
  cardType: string;

  @ApiProperty({ example: 5000, description: 'Credit limit on the card' })
  @IsNumber()
  @IsNotEmpty()
  @Min(100)
  creditLimit: number;
}

export class CreditCardResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  cardType: string;

  @ApiProperty()
  expiryDate: Date;

  @ApiProperty()
  creditLimit: number;

  @ApiProperty()
  availableCredit: number;

  @ApiProperty({ enum: CreditCardStatus })
  status: CreditCardStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateLoanApplicationDto {
  @ApiProperty({ description: 'User ID who is applying for the loan' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: LoanType, description: 'Type of loan' })
  @IsEnum(LoanType)
  @IsNotEmpty()
  loanType: LoanType;

  @ApiProperty({ example: 10000, description: 'Amount of the loan' })
  @IsNumber()
  @IsNotEmpty()
  @Min(100)
  amount: number;

  @ApiProperty({ example: 12, description: 'Loan term in months' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  termMonths: number;
}

export class LoanResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: LoanType })
  loanType: LoanType;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  interestRate: number;

  @ApiProperty()
  termMonths: number;

  @ApiProperty({ enum: LoanStatus })
  status: LoanStatus;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

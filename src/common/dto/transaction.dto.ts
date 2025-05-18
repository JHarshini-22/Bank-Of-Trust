import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { TransactionType, TransactionStatus } from '../interfaces/transaction.interface';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Account ID from which the money is transferred', required: false })
  @IsString()
  @IsOptional()
  fromAccountId?: string;

  @ApiProperty({ description: 'Account ID to which the money is transferred', required: false })
  @IsString()
  @IsOptional()
  toAccountId?: string;

  @ApiProperty({ example: 100.50, description: 'Amount of money to transfer' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'USD', description: 'Currency of the transaction' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ enum: TransactionType, description: 'Type of transaction' })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ example: 'Payment for services', description: 'Description of the transaction', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  fromAccountId?: string;

  @ApiProperty({ required: false })
  toAccountId?: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty()
  reference: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { AccountType, AccountStatus } from '../interfaces/account.interface';

export class CreateAccountDto {
  @ApiProperty({ description: 'User ID who owns this account' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: AccountType, description: 'Type of account' })
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({ example: 'USD', description: 'Currency of the account' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ example: false, description: 'Is this the default account', default: false })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean = false;
}

export class UpdateAccountDto {
  @ApiProperty({ enum: AccountStatus, required: false })
  @IsEnum(AccountStatus)
  @IsOptional()
  status?: AccountStatus;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class AccountResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty({ enum: AccountType })
  accountType: AccountType;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ enum: AccountStatus })
  status: AccountStatus;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

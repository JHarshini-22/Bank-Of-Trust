import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '../interfaces/user.interface';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.CUSTOMER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.CUSTOMER;

  @ApiProperty({ enum: UserStatus, default: UserStatus.PENDING_VERIFICATION })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus = UserStatus.PENDING_VERIFICATION;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ enum: UserStatus, required: false })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

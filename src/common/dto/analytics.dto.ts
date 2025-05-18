import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsArray, IsObject } from 'class-validator';
import { TimeFrame, SpendingCategory, CategorySpending } from '../interfaces/analytics.interface';

export class GetSpendingAnalyticsDto {
  @ApiProperty({ description: 'User ID for which to get analytics' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: TimeFrame, description: 'Timeframe for analytics' })
  @IsEnum(TimeFrame)
  @IsNotEmpty()
  timeframe: TimeFrame;
}

export class SpendingAnalyticsResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: TimeFrame })
  timeframe: TimeFrame;

  @ApiProperty({ type: [Object] })
  categories: CategorySpending[];

  @ApiProperty()
  totalSpent: number;

  @ApiProperty()
  previousPeriodSpent: number;

  @ApiProperty()
  changePercentage: number;
}

export class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'Groceries', description: 'Name of the spending category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '#FF5733', description: 'Color code for the category' })
  @IsString()
  @IsNotEmpty()
  color: string;
}

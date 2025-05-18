import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  GetSpendingAnalyticsDto, 
  SpendingAnalyticsResponseDto,
  CreateCategoryDto,
  CategoryDto
} from '../../common/dto/analytics.dto';
import { SpendingCategory, SpendingCategoryDocument } from './schemas/analytics.schema';
import { TimeFrame, CategorySpending } from '../../common/interfaces/analytics.interface';
import { TransactionType } from '../../common/interfaces/transaction.interface';
import { PrismaService } from '../../database/postgres/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(SpendingCategory.name) private categoryModel: Model<SpendingCategoryDocument>,
    private prisma: PrismaService,
  ) {
    // Create default categories if none exist
    this.initDefaultCategories();
  }

  async getSpendingAnalytics(dto: GetSpendingAnalyticsDto): Promise<SpendingAnalyticsResponseDto> {
    const { userId, timeframe } = dto;
    
    // Get date ranges for current and previous periods
    const { currentStart, currentEnd, previousStart, previousEnd } = this.getDateRanges(timeframe);
    
    // Get user accounts
    const userAccounts = await this.prisma.account.findMany({
      where: { userId },
      select: { id: true },
    });
    
    const accountIds = userAccounts.map(account => account.id);
    
    // Get transactions for both periods
    const currentTransactions = await this.prisma.transaction.findMany({
      where: {
        fromAccountId: { in: accountIds },
        type: { in: [TransactionType.PAYMENT, TransactionType.WITHDRAWAL, TransactionType.TRANSFER] },
        createdAt: { gte: currentStart, lte: currentEnd },
      },
    });
    
    const previousTransactions = await this.prisma.transaction.findMany({
      where: {
        fromAccountId: { in: accountIds },
        type: { in: [TransactionType.PAYMENT, TransactionType.WITHDRAWAL, TransactionType.TRANSFER] },
        createdAt: { gte: previousStart, lte: previousEnd },
      },
    });
    
    // Get all categories
    const categories = await this.categoryModel.find().exec();
    
    // Calculate spending by category
    const totalSpent = currentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const previousPeriodSpent = previousTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    
    // Simple mock categorization based on description
    // In a real app, would use transaction metadata or machine learning
    const categorySpending: CategorySpending[] = categories.map(category => {
      // Simple matching based on category name appearing in description
      const categoryTransactions = currentTransactions.filter(tx => 
        tx.description && tx.description.toLowerCase().includes(category.name.toLowerCase())
      );
      
      const amount = categoryTransactions.reduce((sum, tx) => sum + tx.amount, 0);
      const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
      
      return {
        category: {
          id: category._id.toString(),
          name: category.name,
          color: category.color,
        },
        amount,
        percentage,
        transactions: categoryTransactions.length,
      };
    });
    
    // Sort categories by amount spent (descending)
    categorySpending.sort((a, b) => b.amount - a.amount);
    
    // Calculate change percentage
    const changePercentage = previousPeriodSpent > 0 
      ? ((totalSpent - previousPeriodSpent) / previousPeriodSpent) * 100 
      : 0;
    
    return {
      userId,
      timeframe,
      categories: categorySpending,
      totalSpent,
      previousPeriodSpent,
      changePercentage,
    };
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const newCategory = new this.categoryModel(createCategoryDto);
    const savedCategory = await newCategory.save();
    
    return {
      id: savedCategory._id.toString(),
      name: savedCategory.name,
      color: savedCategory.color,
    };
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryModel.find().exec();
    
    return categories.map(category => ({
      id: category._id.toString(),
      name: category.name,
      color: category.color,
    }));
  }

  private async initDefaultCategories() {
    const count = await this.categoryModel.countDocuments().exec();
    
    if (count === 0) {
      const defaultCategories = [
        { name: 'Groceries', color: '#4CAF50' },
        { name: 'Dining', color: '#FF9800' },
        { name: 'Transportation', color: '#2196F3' },
        { name: 'Housing', color: '#9C27B0' },
        { name: 'Entertainment', color: '#E91E63' },
        { name: 'Shopping', color: '#F44336' },
        { name: 'Healthcare', color: '#00BCD4' },
        { name: 'Utilities', color: '#795548' },
        { name: 'Other', color: '#9E9E9E' },
      ];
      
      await this.categoryModel.insertMany(defaultCategories);
    }
  }

  private getDateRanges(timeframe: TimeFrame) {
    const currentEnd = new Date();
    let currentStart = new Date();
    let previousStart = new Date();
    let previousEnd = new Date();
    
    switch (timeframe) {
      case TimeFrame.DAILY:
        currentStart.setHours(0, 0, 0, 0);
        previousEnd.setDate(previousEnd.getDate() - 1);
        previousEnd.setHours(23, 59, 59, 999);
        previousStart.setDate(previousStart.getDate() - 1);
        previousStart.setHours(0, 0, 0, 0);
        break;
        
      case TimeFrame.WEEKLY:
        currentStart.setDate(currentStart.getDate() - 7);
        previousEnd = new Date(currentStart);
        previousEnd.setDate(previousEnd.getDate() - 1);
        previousStart = new Date(previousEnd);
        previousStart.setDate(previousStart.getDate() - 6);
        break;
        
      case TimeFrame.MONTHLY:
        currentStart.setMonth(currentStart.getMonth() - 1);
        previousEnd = new Date(currentStart);
        previousEnd.setDate(previousEnd.getDate() - 1);
        previousStart = new Date(previousEnd);
        previousStart.setMonth(previousStart.getMonth() - 1);
        break;
        
      case TimeFrame.YEARLY:
        currentStart.setFullYear(currentStart.getFullYear() - 1);
        previousEnd = new Date(currentStart);
        previousEnd.setDate(previousEnd.getDate() - 1);
        previousStart = new Date(previousEnd);
        previousStart.setFullYear(previousStart.getFullYear() - 1);
        break;
    }
    
    return { currentStart, currentEnd, previousStart, previousEnd };
  }
}

import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SpendingCategory, SpendingCategorySchema } from './schemas/analytics.schema';
import { DatabaseModule } from '../../database/database.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    TransactionModule,
    MongooseModule.forFeature([
      { name: SpendingCategory.name, schema: SpendingCategorySchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

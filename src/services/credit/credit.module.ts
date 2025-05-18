import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreditController],
  providers: [CreditService],
  exports: [CreditService],
})
export class CreditModule {}

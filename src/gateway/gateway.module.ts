import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { UserModule } from '../services/user/user.module';
import { AccountModule } from '../services/account/account.module';
import { TransactionModule } from '../services/transaction/transaction.module';
import { CreditModule } from '../services/credit/credit.module';
import { AnalyticsModule } from '../services/analytics/analytics.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AccountModule,
    TransactionModule,
    CreditModule,
    AnalyticsModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

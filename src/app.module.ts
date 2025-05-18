import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';

import { UserModule } from './services/user/user.module';
import { AccountModule } from './services/account/account.module';
import { TransactionModule } from './services/transaction/transaction.module';
import { CreditModule } from './services/credit/credit.module';
import { AnalyticsModule } from './services/analytics/analytics.module';

import appConfig from './config/app-config';
import databaseConfig from './config/database-config';
import jwtConfig from './config/jwt-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    AuthModule,
    GatewayModule,
    UserModule,
    AccountModule,
    TransactionModule,
    CreditModule,
    AnalyticsModule,
  ],
})
export class AppModule {}

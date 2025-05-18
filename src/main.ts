import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  // Security middleware
  app.use(helmet());
  app.enableCors();
  
  // Global pipes, filters and interceptors
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Bank of Trust API')
    .setDescription('The Bank of Trust API description')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('accounts', 'Account management endpoints')
    .addTag('transactions', 'Transaction management endpoints')
    .addTag('credit', 'Credit service endpoints')
    .addTag('analytics', 'Analytics service endpoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Start the server
  const port = process.env.PORT || 8000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

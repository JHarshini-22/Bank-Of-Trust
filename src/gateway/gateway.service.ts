import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  healthCheck() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'Bank of Trust API Gateway is running',
    };
  }
}

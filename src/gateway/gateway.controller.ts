import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';

@ApiTags('gateway')
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint for the API Gateway' })
  @ApiResponse({ status: 200, description: 'The API Gateway is healthy' })
  healthCheck() {
    return this.gatewayService.healthCheck();
  }
}

import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { 
  GetSpendingAnalyticsDto, 
  SpendingAnalyticsResponseDto,
  CreateCategoryDto,
  CategoryDto
} from '../../common/dto/analytics.dto';
import { TimeFrame } from '../../common/interfaces/analytics.interface';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('spending')
  @ApiOperation({ summary: 'Get spending analytics for a user' })
  @ApiResponse({ status: 200, description: 'Return spending analytics.', type: SpendingAnalyticsResponseDto })
  @ApiQuery({ name: 'userId', required: true, description: 'User ID' })
  @ApiQuery({ name: 'timeframe', enum: TimeFrame, required: true, description: 'Timeframe for analytics' })
  async getSpendingAnalytics(
    @Query('userId') userId: string,
    @Query('timeframe') timeframe: TimeFrame,
  ): Promise<SpendingAnalyticsResponseDto> {
    const dto: GetSpendingAnalyticsDto = { userId, timeframe };
    return this.analyticsService.getSpendingAnalytics(dto);
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new spending category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: CategoryDto })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.analyticsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all spending categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.', type: [CategoryDto] })
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.analyticsService.getAllCategories();
  }
}

import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, TransactionResponseDto } from '../../common/dto/transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.', type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionResponseDto> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Return all transactions.', type: [TransactionResponseDto] })
  @ApiQuery({ name: 'accountId', required: false, description: 'Filter by account ID' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
  async findAll(
    @Query('accountId') accountId?: string,
    @Query('userId') userId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<TransactionResponseDto[]> {
    return this.transactionService.findAll(accountId, userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by id' })
  @ApiResponse({ status: 200, description: 'Return the transaction.', type: TransactionResponseDto })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  async findOne(@Param('id') id: string): Promise<TransactionResponseDto> {
    return this.transactionService.findOne(id);
  }
}

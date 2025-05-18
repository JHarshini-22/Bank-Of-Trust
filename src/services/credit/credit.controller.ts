import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreditService } from './credit.service';
import { 
  CreateCreditCardDto, 
  CreditCardResponseDto, 
  CreateLoanApplicationDto,
  LoanResponseDto
} from '../../common/dto/credit.dto';

@ApiTags('credit')
@Controller('credit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post('cards')
  @ApiOperation({ summary: 'Apply for a new credit card' })
  @ApiResponse({ status: 201, description: 'The credit card application has been successfully submitted.', type: CreditCardResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createCreditCard(@Body() createCreditCardDto: CreateCreditCardDto): Promise<CreditCardResponseDto> {
    return this.creditService.createCreditCard(createCreditCardDto);
  }

  @Get('cards')
  @ApiOperation({ summary: 'Get all credit cards' })
  @ApiResponse({ status: 200, description: 'Return all credit cards.', type: [CreditCardResponseDto] })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  async findAllCreditCards(@Query('userId') userId?: string): Promise<CreditCardResponseDto[]> {
    return this.creditService.findAllCreditCards(userId);
  }

  @Get('cards/:id')
  @ApiOperation({ summary: 'Get a credit card by id' })
  @ApiResponse({ status: 200, description: 'Return the credit card.', type: CreditCardResponseDto })
  @ApiResponse({ status: 404, description: 'Credit card not found.' })
  @ApiParam({ name: 'id', description: 'Credit Card ID' })
  async findOneCreditCard(@Param('id') id: string): Promise<CreditCardResponseDto> {
    return this.creditService.findOneCreditCard(id);
  }

  @Post('loans')
  @ApiOperation({ summary: 'Apply for a new loan' })
  @ApiResponse({ status: 201, description: 'The loan application has been successfully submitted.', type: LoanResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createLoanApplication(@Body() createLoanApplicationDto: CreateLoanApplicationDto): Promise<LoanResponseDto> {
    return this.creditService.createLoanApplication(createLoanApplicationDto);
  }

  @Get('loans')
  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({ status: 200, description: 'Return all loans.', type: [LoanResponseDto] })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  async findAllLoans(@Query('userId') userId?: string): Promise<LoanResponseDto[]> {
    return this.creditService.findAllLoans(userId);
  }

  @Get('loans/:id')
  @ApiOperation({ summary: 'Get a loan by id' })
  @ApiResponse({ status: 200, description: 'Return the loan.', type: LoanResponseDto })
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  @ApiParam({ name: 'id', description: 'Loan ID' })
  async findOneLoan(@Param('id') id: string): Promise<LoanResponseDto> {
    return this.creditService.findOneLoan(id);
  }
}

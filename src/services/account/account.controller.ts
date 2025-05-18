import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto, AccountResponseDto } from '../../common/dto/account.dto';

@ApiTags('accounts')
@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.', type: AccountResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: 200, description: 'Return all accounts.', type: [AccountResponseDto] })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
  async findAll(
    @Query('userId') userId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<AccountResponseDto[]> {
    return this.accountService.findAll(userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by id' })
  @ApiResponse({ status: 200, description: 'Return the account.', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  async findOne(@Param('id') id: string): Promise<AccountResponseDto> {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an account' })
  @ApiResponse({ status: 200, description: 'The account has been successfully updated.', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountResponseDto> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account' })
  @ApiResponse({ status: 200, description: 'The account has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.accountService.remove(id);
    return { message: 'Account deleted successfully' };
  }
}

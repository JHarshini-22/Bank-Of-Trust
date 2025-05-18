import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateUserDto, UserResponseDto } from '../common/dto/user.dto';

class LoginDto {
  email: string;
  password: string;
}

class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User has been successfully registered.', type: LoginResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the profile of the currently logged in user' })
  @ApiResponse({ status: 200, description: 'Return the user profile.', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    return req.user;
  }
}

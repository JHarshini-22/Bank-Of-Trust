import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user/user.service';
import { CreateUserDto, UserResponseDto } from '../common/dto/user.dto';
import { User } from '../services/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.usersService.validateUser(email, password);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.generateToken(user);
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      const user = await this.usersService.findByEmail(createUserDto.email);
      
      return this.generateToken(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private generateToken(user: User) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    
    // Remove password from user object
    const { password, ...result } = user.toObject();
    
    return {
      access_token: this.jwtService.sign(payload),
      user: result as UserResponseDto,
    };
  }
}

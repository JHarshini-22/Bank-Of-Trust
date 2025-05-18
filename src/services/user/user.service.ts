import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create new user
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    
    // Convert to response DTO and remove password
    const { password, ...result } = savedUser.toObject();
    return result as UserResponseDto;
  }

  async findAll(page = 1, limit = 10): Promise<UserResponseDto[]> {
    const skip = (page - 1) * limit;
    
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    
    // Remove passwords from response
    return users.map(user => {
      const { password, ...result } = user.toObject();
      return result as UserResponseDto;
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    // Remove password from response
    const { password, ...result } = user.toObject();
    return result as UserResponseDto;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    // Remove password from response
    const { password, ...result } = updatedUser.toObject();
    return result as UserResponseDto;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      
      if (!user) {
        return null;
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return null;
      }
      
      return user;
    } catch (error) {
      return null;
    }
  }
}

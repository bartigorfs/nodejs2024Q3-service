import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '@/core/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { User } from '@/core/models/User';
import { memoryInstance } from '@/core/memdb/memdb';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users: User[] = memoryInstance.getUsers();
      return plainToInstance(UserDto, users);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    try {
      user['id'] = uuidv4();
      user['version'] = 1;
      const createdUser = memoryInstance.createUser(user);
      return plainToInstance(UserDto, createdUser);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<User> {
    const foundUser: Promise<User> = this.findUserById(id);
    return plainToInstance(UserDto, foundUser);
  }

  private async findUserById(id: string): Promise<User> {
    let user: User;

    try {
      user = memoryInstance.getUserById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}

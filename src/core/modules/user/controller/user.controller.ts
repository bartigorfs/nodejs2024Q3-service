import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@/core/models/User';
import { CreateUserDto, UpdatePasswordDto } from '@/core/dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users: User[] = await this.userService.getAllUsers();
    return users;
  }

  @Post()
  async createNewUser(@Body() user: CreateUserDto): Promise<User> {
    const newUser: User = await this.userService.createUser(user);
    return newUser;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user: User = await this.userService.getUserById(id);
    return user;
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() user: UpdatePasswordDto,
  ): Promise<User> {
    const updatedUser: User = await this.userService.updateUserPassword(
      id,
      user,
    );
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.userService.deleteUser(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}

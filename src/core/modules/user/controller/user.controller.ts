import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from '../service/user.service';
import { User } from '@/core/models/User';
import { CreateUserDto } from '@/core/dto/user.dto';

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
}

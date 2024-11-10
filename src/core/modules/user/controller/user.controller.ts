import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@/core/models/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users: User[] = await this.userService.getAllUsers();
    return users;
  }
}

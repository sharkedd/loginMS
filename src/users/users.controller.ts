import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //Para poder ejecutarse el createUser debe recibir una petición Post
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.getUserById(id);
  }
}

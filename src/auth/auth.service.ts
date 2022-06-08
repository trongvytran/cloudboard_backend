import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (user) {
      return user;
    }
    const role = await this.rolesService.findOneByName('User');
    loginDto.role = role;
    return this.usersService.create(loginDto);
  }
}

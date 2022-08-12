import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async run() {
    const user = await this.userRepository.find();
    const role = await this.roleRepository.findOneBy({ name: 'User' });
    if (user.length === 0) {
      await this.userRepository.insert([
        {
          name: 'Hoang An Le Ba',
          email: 'hoanganleba@gmail.com',
          imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
          role,
        },
      ]);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async run() {
    const user = await this.userRepository.find();
    if (user.length === 0) {
      await this.userRepository.insert([
        {
          name: 'Hoang An Le Ba',
          email: 'hoanganleba@gmail.com',
          imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
          role: { id: 2, name: 'User' },
        },
        {
          name: 'Minh',
          email: 'Minh@gmail.com',
          imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
          role: { id: 2, name: 'User' },
        },
      ]);
    }
  }
}

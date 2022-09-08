import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { faker } from '@faker-js/faker/locale/vi';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async run() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = lastName + ' ' + firstName;
    const user = await this.userRepository.find();
    const role = await this.roleRepository.findOneBy({ id: 2 });
    if (user.length === 0) {
      await this.userRepository.insert([
        {
          name: fullName,
          email: faker.internet.email(firstName, lastName),
          phoneNumber: faker.phone.number('+84 9# ### ## ##'),
          imageUrl: faker.image.people(500, 500, true),
          role,
        },
      ]);
    }
  }
}

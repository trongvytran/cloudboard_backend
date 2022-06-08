import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async run() {
    const role = await this.roleRepository.find();
    if (role.length === 0) {
      await this.roleRepository.insert([
        {
          name: 'Admin',
        },
        {
          name: 'User',
        },
      ]);
    }
  }
}

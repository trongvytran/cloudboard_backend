import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import StripeService from '../stripe/stripe.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private stripeService: StripeService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const stripeCustomer = await this.stripeService.createCustomer(
      createUserDto.name,
      createUserDto.email,
    );

    const newUser = await this.userRepository.create({
      ...createUserDto,
      stripeCustomerId: stripeCustomer.id,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'billboards', 'subscription'],
    });
  }

  findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role', 'billboards', 'subscription'],
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role', 'billboards', 'subscription'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

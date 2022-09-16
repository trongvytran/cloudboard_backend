import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import StripeService from '../stripe/stripe.service';
import { Billboard } from '../billboards/entities/billboard.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Billboard)
    private billboardsRepository: Repository<Billboard>,
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
      relations: ['role', 'billboards', 'subscription', 'bookedBillboards'],
    });
  }

  findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role', 'billboards', 'subscription', 'bookedBillboards'],
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role', 'billboards', 'subscription', 'bookedBillboards'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async bookBillboard(id: number, item: any) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'billboards', 'subscription', 'bookedBillboards'],
    });
    const billboard = await this.billboardsRepository.findOne({
      where: { id: item.billboardId },
      relations: ['district', 'city', 'ward', 'subscription', 'user'],
    });
    user.bookedBillboards.push(billboard);
    return this.userRepository.save(user);
  }
}

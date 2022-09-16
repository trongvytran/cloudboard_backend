import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import StripeService from '../stripe/stripe.service';
import { Billboard } from '../billboards/entities/billboard.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Billboard, User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, StripeService],
  exports: [UsersService],
})
export class UsersModule {}

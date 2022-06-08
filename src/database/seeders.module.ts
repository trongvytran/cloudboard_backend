import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../districts/entities/district.entity';
import { Ward } from '../wards/entities/ward.entity';
import { City } from '../cities/entities/city.entity';
import { Role } from '../roles/entities/role.entity';
import { CitySeeder } from './seeders/city.seeder';
import { RoleSeeder } from './seeders/role.seeder';
import { WardSeeder } from './seeders/ward.seeder';
import { DistrictSeeder } from './seeders/district.seeder';
import { User } from '../users/entities/user.entity';
import { UserSeeder } from './seeders/user.seeder';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionSeeder } from './seeders/subscription.seeder';
import { Billboard } from '../billboards/entities/billboard.entity';
import { BillboardSeeder } from './seeders/billboard.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      City,
      Ward,
      District,
      User,
      Subscription,
      Billboard,
    ]),
  ],
  providers: [
    RoleSeeder,
    CitySeeder,
    WardSeeder,
    DistrictSeeder,
    UserSeeder,
    SubscriptionSeeder,
    BillboardSeeder,
  ],
  exports: [
    RoleSeeder,
    CitySeeder,
    WardSeeder,
    DistrictSeeder,
    UserSeeder,
    SubscriptionSeeder,
    BillboardSeeder,
  ],
})
export class SeedersModule {}

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BillboardSeeder } from './database/seeders/billboard.seeder';
import { CitySeeder } from './database/seeders/city.seeder';
import { DistrictSeeder } from './database/seeders/district.seeder';
import { RoleSeeder } from './database/seeders/role.seeder';
import { SubscriptionSeeder } from './database/seeders/subscription.seeder';
import { UserSeeder } from './database/seeders/user.seeder';
import { WardSeeder } from './database/seeders/ward.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly roleSeeder: RoleSeeder,
    private readonly citySeeder: CitySeeder,
    private readonly districtSeeder: DistrictSeeder,
    private readonly wardSeeder: WardSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly subscriptionSeeder: SubscriptionSeeder,
    private readonly billboardSeeder: BillboardSeeder,
  ) {}
  async onApplicationBootstrap() {
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development'
    ) {
      await this.userSeeder.run();
      await this.citySeeder.run();
      await this.districtSeeder.run();
      await this.wardSeeder.run();
      await this.subscriptionSeeder.run();
      await this.billboardSeeder.run();
    }
    await this.roleSeeder.run();
  }
}

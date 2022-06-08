import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillboardsModule } from './billboards/billboards.module';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DistrictsModule } from './districts/districts.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { SeedersModule } from './database/seeders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    BillboardsModule,
    CitiesModule,
    UsersModule,
    WardsModule,
    TransactionsModule,
    SubscriptionsModule,
    DistrictsModule,
    DatabaseModule,
    RolesModule,
    AuthModule,
    SeedersModule,
  ],
  providers: [AppService],
})
export class AppModule {}

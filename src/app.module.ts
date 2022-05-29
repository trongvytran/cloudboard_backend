import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillboardsModule } from './billboards/billboards.module';
import { ProductsModule } from './products/products.module';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DistrictsModule } from './districts/districts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BillboardsModule,
    CitiesModule,
    ProductsModule,
    UsersModule,
    WardsModule,
    TransactionsModule,
    SubscriptionsModule,
    DistrictsModule,
    DatabaseModule,
  ],
})
export class AppModule {}

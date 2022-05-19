import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BillboardsModule } from './billboards/billboards.module';
import { ProductsModule } from './products/products.module';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    BillboardsModule,
    CitiesModule,
    ProductsModule,
    UsersModule,
    WardsModule,
    TransactionsModule,
    SubscriptionsModule,
    DistrictsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

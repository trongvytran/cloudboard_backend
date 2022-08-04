import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    UsersModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}

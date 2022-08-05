import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { GoogleTokenDto } from './dto/google-token.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FacebookTokenDto } from './dto/facebook-token.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwtToken(user: {
    id: any;
    name: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    role: Role;
  }) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      phoneNumber: user.phoneNumber,
      role: user.role.name,
    };
    return { token: this.jwtService.sign(payload), user: payload };
  }

  async googleLogin(googleTokenDto: GoogleTokenDto) {
    const res = await lastValueFrom(
      this.httpService.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleTokenDto.accessToken}`,
      ),
    );

    const user = await this.usersService.findOneByEmail(res.data.email);
    if (user) {
      return this.generateJwtToken(user);
    }
    const role = await this.rolesService.findOneByName('User');
    const registerInfo = {
      name: res.data.name,
      email: res.data.email,
      imageUrl: res.data.picture,
      phoneNumber: '',
      role,
    };
    const newUser = await this.usersService.create(registerInfo);
    return this.generateJwtToken(newUser);
  }

  async facebookLogin(facebookTokenDto: FacebookTokenDto) {
    const res = await lastValueFrom(
      this.httpService.get(
        `https://graph.facebook.com/me?access_token=${facebookTokenDto.accessToken}&fields=id,name,email,picture`,
      ),
    );

    const user = await this.usersService.findOneByEmail(res.data.email);
    if (user) {
      return this.generateJwtToken(user);
    }
    const role = await this.rolesService.findOneByName('User');
    const registerInfo = {
      name: res.data.name,
      email: res.data.email,
      imageUrl: res.data.picture.data.url,
      phoneNumber: '',
      role,
    };
    const newUser = await this.usersService.create(registerInfo);
    return this.generateJwtToken(newUser);
  }
}

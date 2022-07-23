import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { Auth, google } from 'googleapis';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (user) {
      return user;
    }
    const role = await this.rolesService.findOneByName('User');
    loginDto.role = role;
    return this.usersService.create(loginDto);
  }

  async loginGoogleUser(
    token: string,
    values: { userAgent: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const user = await this.usersService.findOneByEmail(tokenInfo.email);
    if (user) {
      return this.newRefreshAndAccessToken(user, values);
    }
    return undefined;
  }

  async login2(
    email: string,
    values: { userAgent: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return undefined;
    }
    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);
    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.usersService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }
}

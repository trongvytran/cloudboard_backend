import { Body, Controller, Delete, HttpException, HttpStatus, Ip,Post, Req,} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import GoogleTokenDto from './dto/google-token.dto';
import { Request, Response } from 'express';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login using Google Facebook. Register if not exist',
  })
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
    
  }
  @Post('/google/login')
  async googleLogin(
    @Body() body: GoogleTokenDto,
    @Req() req,
   
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.authService.loginGoogleUser(body.token, {
      userAgent: req.headers['user-agent'],
    
    });
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging in with google',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('login2')
  async login2(@Req() request, @Body() body: LoginDto) {
    return this.authService.login2(body.email,{

      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}

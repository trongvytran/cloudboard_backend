import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FacebookTokenDto } from './dto/facebook-token.dto';
import { GoogleTokenDto } from './dto/google-token.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  @ApiOperation({ summary: 'Login with google. Create new user if not exist' })
  googleLogin(@Body() googleTokenDto: GoogleTokenDto) {
    return this.authService.googleLogin(googleTokenDto);
  }

  @Post('facebook/login')
  @ApiOperation({
    summary: 'Login with facebook. Create new user if not exist',
  })
  facebookLogin(@Body() facebookTokenDto: FacebookTokenDto) {
    return this.authService.facebookLogin(facebookTokenDto);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  googleLogin(req: any) {
    if (!req.user) return 'No user from google';
    return {
      message: 'User info from Google',
      user: req.user,
    };
  }
  facebookLogin(req: any) {
    if (!req.user) return 'No user from facebook';
    return {
      message: 'User info from Facebook',
      user: req.user,
    };
  }
}

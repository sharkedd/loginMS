import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SingInDto } from 'src/users/dto/sign-in.dto';
import { JwtPayload } from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() signInDto: SingInDto) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.pass,
    );
    console.log(token);
    return token;
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    console.log("Llegó a profile")
    return req.user;
  }
  
  @Get(':t')
  async verToken(@Param('t') t: string): Promise<Boolean> {
    return this.authService.verifyToken(t);
  }

  @Post(':t')
  getId(@Param('t') t: string): String {
    return this.authService.decodeToken(t);
  }
}

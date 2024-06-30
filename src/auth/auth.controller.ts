import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthTokenResponse } from './interfaces';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    public constructor(private readonly authService: AuthService) { }

    @Post('register')
    public async register(@Body() data: RegisterDto): Promise<AuthTokenResponse> {
        return this.authService.register(data);
    }

    @Post('login')
    public async login(@Body() data: LoginDto): Promise<AuthTokenResponse> {
        return this.authService.login(data);
    }
}

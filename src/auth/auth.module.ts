import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../db/repositories/UserRepository.repository';
import { AuthTokenRepository } from '../db/repositories/AuthTokenRepository.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from '../db/entities/AuthToken.entity';
import { User } from '../db/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthTokenRepository, UserRepository],
    exports: [AuthService],
    imports: [
        TypeOrmModule.forFeature([AuthToken, User]),
        JwtModule.register({
            secret: String(env.JWT_SECRET),
        }),
    ],
})
export class AuthModule { }

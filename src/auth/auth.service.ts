import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenRepository } from '../db/repositories/AuthTokenRepository.repository';
import { UserRepository } from '../db/repositories/UserRepository.repository';
import { User } from '../db/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenResponse, UserType } from './interfaces';
import { AuthToken } from '../db/entities/AuthToken.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly authTokenRepository: AuthTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    private parseRequestBodyToUser(user: User, data: Partial<UserType>): User {
        user.email = data.email;

        if (data.password) {
            user.password = bcrypt.hashSync(
                data.password,
                bcrypt.genSaltSync(),
            );
        }

        user.fullName = data.fullName;

        return user;
    }

    private signToken(user: User): string {
        return this.jwtService.sign(
            {
                email: user.email,
            },
            {
                expiresIn: '7d',
                subject: user.id,
                issuer: 'organize-me',
            },
        );
    }

    private generateAuthToken(user: User): AuthToken {
        const authToken = this.authTokenRepository.create();

        authToken.token = this.signToken(user);
        authToken.isRevoked = false;
        authToken.expiresAt = new Date(
            this.jwtService.verify(authToken.token).exp * 1000,
        );
        authToken.user = user;

        return authToken;
    }

    public async register(data: UserType): Promise<AuthTokenResponse> {
        if (await this.userRepository.existsByEmail(data.email)) {
            throw new BadRequestException(
                `Usuário ${data.email} já cadastrado.`,
            );
        }

        const user = await this.userRepository.save(
            this.parseRequestBodyToUser(this.userRepository.create(), data),
        );

        const authToken = await this.authTokenRepository.save(
            this.generateAuthToken(user),
        );

        return { accessToken: authToken.token };
    }

    public async login(data: LoginDto): Promise<AuthTokenResponse> {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user || !bcrypt.compareSync(data.password, user.password)) {
            throw new BadRequestException('Usuário ou senha inválidos.');
        }

        const authTokens =
            await this.authTokenRepository.findActivesByUserId(user);

        authTokens.forEach(async (authToken) => {
            await this.authTokenRepository.revokeToken(authToken);
        });

        const authToken = await this.authTokenRepository.save(
            this.generateAuthToken(user),
        );

        return { accessToken: authToken.token };
    }
}

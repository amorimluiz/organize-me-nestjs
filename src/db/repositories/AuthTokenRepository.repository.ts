import { AuthToken } from '../entities/AuthToken.entity';
import { BaseRepository } from '../BaseRepository.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

interface IAuthTokenRepository {
    findActivesByUserId(user: User): Promise<AuthToken[]>;
    findByToken(token: string): Promise<AuthToken | null>;
    revokeToken(token: AuthToken): Promise<AuthToken>;
}

@Injectable()
export class AuthTokenRepository extends BaseRepository<AuthToken> implements IAuthTokenRepository {
    public constructor(
        @InjectRepository(AuthToken)
        protected readonly repository: Repository<AuthToken>
    ) {
        super(repository);
    }

    public async findActivesByUserId(user: User): Promise<AuthToken[]> {
        return this.repository.findBy({ user: { id: user.id }, isRevoked: false });
    }

    public async findByToken(token: string): Promise<AuthToken | null> {
        return this.repository.findOneBy({ token });
    }

    public async revokeToken(token: AuthToken): Promise<AuthToken> {
        token.isRevoked = true;
        return this.save(token);
    }
}

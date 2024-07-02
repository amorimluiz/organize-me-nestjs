import { BaseRepository } from '../BaseRepository.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

interface IUserRepository {
    existsByEmail(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<User | null>;
}

@Injectable()
export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository
{
    public constructor(
        @InjectRepository(User)
        protected readonly repository: Repository<User>,
    ) {
        super(repository);
    }

    public async existsByEmail(email: string): Promise<boolean> {
        return this.repository.existsBy({ email });
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }
}

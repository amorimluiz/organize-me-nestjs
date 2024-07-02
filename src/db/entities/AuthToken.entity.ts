import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from './User.entity';

@Entity('auth_tokens')
export class AuthToken {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    public token: string;

    @Column({ type: 'boolean', default: false })
    public isRevoked: boolean;

    @Column({ type: 'datetime' })
    public expiresAt: Date;

    @ManyToOne(() => User, (user) => user.tokens, { nullable: false })
    public user: User;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}

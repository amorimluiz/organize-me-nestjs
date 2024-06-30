import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User.entity';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    public token: string;

    @Column({ type: 'boolean', default: false })
    public isRevoked: boolean;

    @Column({ type: 'datetime' })
    public expiresAt: Date;

    @ManyToOne(() => User, (user) => user.tokens)
    public user: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}

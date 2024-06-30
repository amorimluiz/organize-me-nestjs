import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AuthToken } from './AuthToken.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    public email: string;

    @Column({ type: 'varchar', length: 100 })
    public fullName: string;

    @Column({ type: 'varchar', length: 80 })
    public password: string;

    @Column({ type: 'varchar', length: 36, nullable: true, default: null })
    public profilePhoto: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    @OneToMany(() => AuthToken, (token) => token.user)
    public tokens: AuthToken[];
}

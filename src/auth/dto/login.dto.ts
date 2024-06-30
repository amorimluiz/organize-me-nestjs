import { IsEmail, IsStrongPassword } from 'class-validator';
import passwordConfig from '../password-config';

export class LoginDto {
    @IsEmail()
    public email: string;

    @IsStrongPassword(passwordConfig)
    public password: string;
}

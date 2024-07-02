import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import passwordConfig from '../password-config';

export class RegisterDto {

    @IsEmail()
    public email: string;

    @IsStrongPassword(passwordConfig)
    public password: string;

    @IsString()
    public fullName: string;
}

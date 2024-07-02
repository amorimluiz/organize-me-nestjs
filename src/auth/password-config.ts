import { IsStrongPasswordOptions } from 'class-validator';

const passwordConfig: IsStrongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
};

export default passwordConfig;

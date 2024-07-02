import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { AuthTokenRepository } from '../../src/db/repositories/AuthTokenRepository.repository';
import { UserRepository } from '../../src/db/repositories/UserRepository.repository';
import { TestBed } from '@automock/jest';
import { AuthToken } from '../../src/db/entities/AuthToken.entity';
import { User } from '../../src/db/entities/User.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('auth service suite', () => {
    let authService: AuthService;
    let userRepository: jest.Mocked<UserRepository>;
    let authTokenRepository: jest.Mocked<AuthTokenRepository>;
    let jwtService: jest.Mocked<JwtService>;

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(AuthService).compile();

        authService = unit;
        userRepository = unitRef.get(UserRepository);
        authTokenRepository = unitRef.get(AuthTokenRepository);
        jwtService = unitRef.get(JwtService);

        userRepository.create.mockReturnValue({} as User);
        userRepository.save.mockImplementation((user) => Promise.resolve(user));

        authTokenRepository.create.mockReturnValue({} as AuthToken);
        authTokenRepository.save.mockImplementation((authToken) =>
            Promise.resolve(authToken),
        );
        authTokenRepository.findActivesByUserId.mockResolvedValue([
            { isRevoked: false },
        ] as AuthToken[]);
        authTokenRepository.revokeToken.mockResolvedValue({
            isRevoked: true,
        } as AuthToken);

        jwtService.sign.mockReturnValue('token');
        jwtService.verify.mockReturnValue({ exp: Date.now() / 1000 });
    });

    const email = 'johndoe@test.com.br';
    const password = '123456';
    const fullName = 'John Doe';

    it('should register a user', async () => {
        // Arrange
        const data = { email, password, fullName };

        userRepository.existsByEmail.mockResolvedValue(false);

        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

        // Act
        const result = await authService.register(data);

        // Assert
        expect(userRepository.existsByEmail).toHaveBeenCalledWith(email);
        expect(userRepository.create).toHaveBeenCalled();
        expect(userRepository.save).toHaveBeenCalled();
        expect(authTokenRepository.create).toHaveBeenCalled();
        expect(jwtService.sign).toHaveBeenCalled();
        expect(jwtService.verify).toHaveBeenCalled();
        expect(authTokenRepository.save).toHaveBeenCalled();
        expect(result).toEqual({ accessToken: 'token' });
    });

    it('should throw an error when email already exists', async () => {
        // Arrange
        const data = { email, password, fullName };

        userRepository.existsByEmail.mockResolvedValue(true);

        // Act && Assert
        await expect(authService.register(data)).rejects.toThrow(
            `Usuário ${data.email} já cadastrado.`,
        );
        expect(userRepository.existsByEmail).toHaveBeenCalledWith(email);
    });

    it('should login a user', async () => {
        // Arrange
        const data = { email, password };
        const user = { password: '654321' } as User;

        userRepository.findByEmail.mockResolvedValue(user);

        // Act
        const result = await authService.login(data);

        // Assert
        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(jwtService.sign).toHaveBeenCalled();
        expect(jwtService.verify).toHaveBeenCalled();
        expect(authTokenRepository.findActivesByUserId).toHaveBeenCalledWith(
            user,
        );
        expect(authTokenRepository.revokeToken).toHaveBeenCalled();
        expect(authTokenRepository.save).toHaveBeenCalled();
        expect(result).toEqual({ accessToken: 'token' });
    });

    it('should throw an error when user not found', async () => {
        // Arrange
        const data = { email, password };

        userRepository.findByEmail.mockResolvedValue(null);

        // Act && Assert
        await expect(authService.login(data)).rejects.toThrow(
            'Usuário ou senha inválidos.',
        );
        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw an error when password is invalid', async () => {
        // Arrange
        const data = { email, password };
        const user = { password: '654321' } as User;

        userRepository.findByEmail.mockResolvedValue(user);
        (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

        // Act && Assert
        await expect(authService.login(data)).rejects.toThrow(
            'Usuário ou senha inválidos.',
        );
        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt.compareSync).toHaveBeenCalledWith(
            data.password,
            user.password,
        );
    });
});

import { TestBed } from '@automock/jest';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';

describe('auth controller suite', () => {
    let authController: AuthController;
    let authService: jest.Mocked<AuthService>;

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(AuthController).compile();

        authController = unit;
        authService = unitRef.get(AuthService);

        authService.register.mockResolvedValue({ accessToken: 'token' });
        authService.login.mockResolvedValue({ accessToken: 'token' });
    });

    const email = 'johndoe@test.com.br';
    const password = '123456';
    const fullName = 'John Doe';

    it('should register a user', async () => {
        // Arrange
        const data = { email, password, fullName };

        // Act
        const result = await authController.register(data);

        // Assert
        expect(authService.register).toHaveBeenCalledWith(data);
        expect(result).toEqual({ accessToken: 'token' });
    });

    it('should login a user', async () => {
        // Arrange
        const data = { email, password };

        // Act
        const result = await authController.login(data);

        // Assert
        expect(authService.login).toHaveBeenCalledWith(data);
        expect(result).toEqual({ accessToken: 'token' });
    });
});

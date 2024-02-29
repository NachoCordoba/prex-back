import AuthService from '../auth.service';
import SignupDTO from '../dto/signup.dto';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UnathorizedExpection from '../../../lib/exception/authorization.exception';
import IUserService from '../../user/interface/user.service.interface';

const mockUserService: IUserService  = {
    findOne: jest.fn(),
    save: jest.fn(entity => { return { ...entity, id: 'mocked-user-id' }}),
    findAndCount: jest.fn(),
    delete: jest.fn(),
    list: jest.fn()
};

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    compareSync: jest.fn(),
}));

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService(mockUserService);
        jest.clearAllMocks(); 
    });

    describe('signup', () => {
        it('should save new user and return access token', async () => {
            const newUser: SignupDTO = {
                email: 'test@example.com',
                password: 'password123',
                userName: 'test',
            };
            const user = { ...newUser, id: 'mocked-user-id', createdBy: newUser.email };
            (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
            (jwt.sign as jest.Mock).mockReturnValue('mocked-access-token');

            const result = await authService.signup(newUser);
            expect(mockUserService.save).toHaveBeenCalledWith({ ...newUser, createdBy: newUser.email });
            expect(jwt.sign).toHaveBeenCalledWith(user, expect.any(String), { expiresIn: expect.any(String) });
            expect(result).toEqual({ token: 'mocked-access-token' });
        });
    });

    describe('signin', () => {
        it('should throw UnauthorizedException if user does not exist', async () => {
            (mockUserService.findOne as jest.Mock).mockResolvedValue(null);

            await expect(authService.signin({ email: 'nonexistent@example.com', password: 'password' })).rejects.toThrow(UnathorizedExpection);
        });

        it('should throw UnauthorizedException if password is incorrect', async () => {
            const user = { email: 'test@example.com', password: 'hashed-password' };
            (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

            await expect(authService.signin({ email: 'test@example.com', password: 'incorrect' })).rejects.toThrow(UnathorizedExpection);
        });

        it('should return access token if email and password are correct', async () => {
            const user = { email: 'test@example.com', password: 'hashed-password' };
            (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mocked-access-token');

            const result = await authService.signin({ email: 'test@example.com', password: 'correct' });

            expect(jwt.sign).toHaveBeenCalledWith(user, expect.any(String), { expiresIn: expect.any(String) });
            expect(result).toEqual({ token: 'mocked-access-token' });
        });
    });
});
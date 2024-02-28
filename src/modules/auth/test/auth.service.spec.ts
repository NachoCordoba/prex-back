import UnathorizedExpection from "../../../lib/exception/authorization.exception";
import UserRepository from "../../user/user.repository";
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import * as bcrypt from 'bcryptjs';

jest.mock('../../user/user.repository', () => {
    return jest.fn().mockImplementation(() => ({
        constructor(){}
    }));
});

describe('AuthService', () => {    
    const mockAuthService = new AuthService(new UserService(new UserRepository()));

    describe('Signin', () => {
        jest.mock('../../user/user.service');
        
        test('Empty fields', async () => {
            const functionNameMock = jest.fn().mockResolvedValue(null);
            jest.spyOn(UserService.prototype, "findOne").mockImplementation(functionNameMock);
            await expect(mockAuthService.signin({ email: '', password: '' })).rejects.toThrow(UnathorizedExpection);
        })

        test('Bad credentials', async () => {
            const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
            const functionNameMock = jest.fn().mockResolvedValue({
                email: 'prueba@prueba.com',
                password: bcrypt.hashSync('123', saltRounds)
            });
            jest.spyOn(UserService.prototype, "findOne").mockImplementation(functionNameMock);
            await expect(mockAuthService.signin({ email: 'prueba@prueba.com', password: '1234' })).rejects.toThrow(UnathorizedExpection);
        })

        test('Good credentials', async () => {
            const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
            const functionNameMock = jest.fn().mockResolvedValue({
                email: 'prueba@prueba.com',
                password: bcrypt.hashSync('123', saltRounds)
            });
            jest.spyOn(UserService.prototype, "findOne").mockImplementation(functionNameMock);
            await expect(mockAuthService.signin({ email: 'prueba@prueba.com', password: '123' })).resolves.toHaveProperty('token');
        })
    })
})
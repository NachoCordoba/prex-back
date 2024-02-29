import CreateUserDTO from "../dto/createUser.dto";
import IUserRepository from "../interface/user.repository.interface"
import UserService from "../user.service"

const mockUserRepository: IUserRepository  = {
    findOne: jest.fn(),
    save: jest.fn(entity => entity),
    findAndCount: jest.fn(),
    softDelete: jest.fn(),
};

jest.mock('bcryptjs', () => ({
    genSaltSync: jest.fn().mockReturnValue('mocked-salt'),
    hashSync: jest.fn().mockReturnValue('hashed-password'),
}));

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService(mockUserRepository);
        jest.clearAllMocks();
    });
    
    
    describe('save', () => {
        it('should hash passwords before saving a single user', async () => {
            const createUserDTO: CreateUserDTO = {
                userName: 'test',
                password: 'test',
                email: 'test',
                createdBy: 'test'
            };

            const createdUser = await userService.save(createUserDTO);

            // Verificar que la función hashSync fue llamada con la contraseña proporcionada
            expect(require('bcryptjs').hashSync).toHaveBeenCalledWith('test', 'mocked-salt');
            // Verificar que el método save del userRepository fue llamado con el DTO modificado
            expect(mockUserRepository.save).toHaveBeenCalledWith({
                ...createUserDTO,
                password: 'hashed-password'
            }, undefined);

            expect(createdUser).toStrictEqual({
                ...createUserDTO,
                password: 'hashed-password'
            })
        });

        it('should hash passwords before saving multiple users', async () => {
            const createUserDTOs = [{
                userName: 'test1',
                password: 'test1',
                email: 'test1',
                createdBy: 'test1'
            }, {
                userName: 'test2',
                password: 'test2',
                email: 'test2',
                createdBy: 'test2'
            }];

            const savedUsers = await userService.save(createUserDTOs);

            // Verificar que la función hashSync fue llamada para cada contraseña proporcionada
            expect(require('bcryptjs').hashSync).toHaveBeenCalledTimes(2);

            const expectedResult = [{
                userName: 'test1',
                password: 'hashed-password',
                email: 'test1',
                createdBy: 'test1'
            }, {
                userName: 'test2',
                password: 'hashed-password',
                email: 'test2',
                createdBy: 'test2'
            }]
            // Verificar que el método save del userRepository fue llamado con los DTOs modificados
            expect(mockUserRepository.save).toHaveBeenCalledWith(expectedResult, undefined);
            expect(savedUsers).toStrictEqual(expectedResult);
        });
    })
})
import CommonService from '../common.service';
import ICommonRepository from '../interface/common.repository.interface';
import { DeepPartial, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm';
import CommonEntity from '../common.entity';

class MockedCommonEntity extends CommonEntity {
    name: string;
    active: boolean;
}

// Mock de ICommonRepository
const mockRepository: ICommonRepository<MockedCommonEntity> = {
    findOne: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(() => Promise.resolve([[], 0])),
    softDelete: jest.fn(),
};

describe('CommonService', () => {
    let commonService: CommonService<MockedCommonEntity>;

    beforeEach(() => {
        commonService = new CommonService(mockRepository);
        jest.clearAllMocks(); // Reiniciar los mocks antes de cada prueba
    });

    describe('findOne', () => {
        it('should call findOne method of repository with provided options', async () => {
            const options: FindOneOptions<MockedCommonEntity> = { where: { id: '1' } };
            await commonService.findOne(options);
            expect(mockRepository.findOne).toHaveBeenCalledWith(options);
        });
    });

    describe('save', () => {
        it('should call save method of repository with provided entities and options', async () => {
            const entities: DeepPartial<MockedCommonEntity>[] = [{ name: 'Entity 1' }, { name: 'Entity 2' }];
            const options: SaveOptions = { transaction: true };
            await commonService.save(entities, options);
            expect(mockRepository.save).toHaveBeenCalledWith(entities, options);
        });
    });

    describe('findAndCount', () => {
        it('should call findAndCount method of repository with provided options', async () => {
            const options: FindManyOptions<MockedCommonEntity> = { where: { active: true } };
            await commonService.findAndCount(options);
            expect(mockRepository.findAndCount).toHaveBeenCalledWith(options);
        });
    });

    describe('list', () => {
        it('should call findAndCount method of repository with default take and skip options', async () => {
            await commonService.list();
            expect(mockRepository.findAndCount).toHaveBeenCalledWith({ take: 25, skip: 0 });
        });

        it('should call findAndCount method of repository with provided page option', async () => {
            await commonService.list({ page: 1 });
            expect(mockRepository.findAndCount).toHaveBeenCalledWith({ take: 25, skip: 25 });
        });
    });

    describe('delete', () => {
        it('should call softDelete method of repository with provided criteria', () => {
            const criteria: string[] = ['id1', 'id2'];
            commonService.delete(criteria);
            expect(mockRepository.softDelete).toHaveBeenCalledWith(criteria);
        });
    });
});
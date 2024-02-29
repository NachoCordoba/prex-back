import { FindOneOptions, DeepPartial, SaveOptions, FindManyOptions, ObjectId, FindOptionsWhere, UpdateResult } from 'typeorm';
import CommonEntity from "../common.entity"

export default interface ICommonService<T extends CommonEntity> {
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    
    save(entities: DeepPartial<T>[], options?: SaveOptions): Promise<T[]>
    save(entity: DeepPartial<T>, options?: SaveOptions): Promise<T>
    save(entities: any, options?: SaveOptions): any;
    
    findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>

    list(options?: { page: number } & FindManyOptions<T>): Promise<{ results: T[], count: number }>

    delete(criteria: string | string[] | ObjectId | ObjectId[] | FindOptionsWhere<T>): Promise<UpdateResult>;
}
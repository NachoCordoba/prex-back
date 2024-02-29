import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectId, SaveOptions, UpdateResult } from "typeorm";
import CommonEntity from "../common.entity";

export default interface ICommonRepository<T extends CommonEntity> {
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    
    save(entities: DeepPartial<T>[], options?: SaveOptions): Promise<T[]>
    save(entity: DeepPartial<T>, options?: SaveOptions): Promise<T>
    save(entities: any, options?: SaveOptions): any;

    findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
    
    softDelete(criteria: string | string[] | ObjectId | ObjectId[] | FindOptionsWhere<T>): Promise<UpdateResult>;
}
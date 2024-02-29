import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectId, SaveOptions } from "typeorm";
import CommonEntity from "./common.entity";
import ICommonRepository from "./interface/common.repository.interface";
import ICommonService from "./interface/common.service.interface";

export const DEFAULT_TAKE = 25;

export default class CommonService<T extends CommonEntity> implements ICommonService<T> {
    constructor(private repository: ICommonRepository<T>){}

    public findOne(options: FindOneOptions<T>): Promise<T | null>{
        return this.repository.findOne(options);
    }

    public save(entities: DeepPartial<T>[], options?: SaveOptions) : Promise<T[]>
    public save(entity: DeepPartial<T>, options?: SaveOptions) : Promise<T>
    public save(entities: any, options?: SaveOptions): any {
        return this.repository.save(entities, options);
    }

    public findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>{
        return this.repository.findAndCount(options);
    }

    public async list(options: { page: number } & FindManyOptions<T> = { page: 0}): Promise<{
        results: T[],
        count: number
    }>{
        const { page, ...extractedOptions } = options;
        const forcedOptions : FindManyOptions<T> = { ...extractedOptions };

        if(!forcedOptions.take) forcedOptions.take = DEFAULT_TAKE;
        if(!forcedOptions.skip) forcedOptions.skip = page * DEFAULT_TAKE;
        
        const findResult = await this.findAndCount(forcedOptions)

        return {
            results: findResult[0],
            count: findResult[1]
        }
    }

    public delete(criteria: string | string[] | ObjectId | ObjectId[] | FindOptionsWhere<T>){
        return this.repository.softDelete(criteria);
    }
}
import { DeepPartial, FindManyOptions, FindOneOptions, Repository, SaveOptions } from "typeorm";
import CommonEntity from "./common.entity";

export const DEFAULT_TAKE = 25;

export default class CommonService<T extends CommonEntity> {
    constructor(private repository: Repository<T>){}

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

    public async list(page: number = 0, options?: FindManyOptions<T>): Promise<{
        results: T[],
        count: number
    }>{
        const forcedOptions : FindManyOptions<T> = { ...options };

        if(!forcedOptions.take) forcedOptions.take = DEFAULT_TAKE;
        if(!forcedOptions.skip) forcedOptions.skip = page * DEFAULT_TAKE;
        
        const findResult = await this.findAndCount(forcedOptions)

        return {
            results: findResult[0],
            count: findResult[1]
        }
    }
}
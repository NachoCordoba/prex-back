import { FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectId, Repository, SaveOptions, UpdateResult } from "typeorm";
import UserEntity from "./user.entity";
import Database from '../../lib/database/database';
import IUserRepository from "./interface/user.repository.interface";
import ICommonRepository from "../../lib/common/interface/common.repository.interface";

export default class UserRepository implements IUserRepository {
    constructor(private _repository: ICommonRepository<UserEntity> = new Repository(UserEntity, Database.getInstance().getDataSource().manager)){}   
    
    findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
        return this._repository.findOne(options);
    }

    findAndCount(options?: FindManyOptions<UserEntity> | undefined): Promise<[UserEntity[], number]> {
        return this._repository.findAndCount(options);
    }
    
    save(entities: UserEntity[], options?: SaveOptions) : Promise<UserEntity[]>
    save(entity: UserEntity, options?: SaveOptions) : Promise<UserEntity>
    save(entities: any, options?: SaveOptions): Promise<UserEntity | UserEntity[]> {
        return this._repository.save(entities, options);
    }

    softDelete(criteria: string | ObjectId | string[] | ObjectId[] | FindOptionsWhere<UserEntity>): Promise<UpdateResult> {
        return this._repository.softDelete(criteria);
    }
}
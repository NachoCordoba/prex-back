import { Repository, SaveOptions } from "typeorm";
import UserEntity from "./user.entity";
import Database from "../../lib/database/database";

export default class UserRepository extends Repository<UserEntity> {
    constructor(){
        super(UserEntity, Database.getInstance().getDataSource().manager);
    }   
    
    async save(entities: UserEntity[], options?: SaveOptions) : Promise<UserEntity[]>
    async save(entity: UserEntity, options?: SaveOptions) : Promise<UserEntity>
    async save(entities: any, options?: SaveOptions): Promise<UserEntity | UserEntity[]> {
        return await super.save(entities, options);
    }
}
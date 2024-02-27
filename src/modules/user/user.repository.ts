import { Repository } from "typeorm";
import UserEntity from "./user.entity";
import Database from "../../lib/database/database";

export default class UserRepository extends Repository<UserEntity> {
    constructor(){
        super(UserEntity, Database.getInstance().getDataSource().manager);
    }   
}
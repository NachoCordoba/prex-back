import { FindOneOptions, SaveOptions } from "typeorm";
import UserRepository from "./user.repository";
import UserDTO from "./dto/user.dto";
import CreateUserDTO from "./dto/createUser.dto";
import * as bcrypt from 'bcryptjs';
import UserEntity from "./user.entity";
import CommonService from "../../lib/common/common.service";

export default class UserService extends CommonService<UserEntity> {
    

    constructor(private userRepository: UserRepository = new UserRepository()){
        super(userRepository);
    }

    private hashPassword(entities: CreateUserDTO | CreateUserDTO[]){
        if(Array.isArray(entities))
            return entities.forEach(entity => {
                const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
                entity.password = bcrypt.hashSync(entity.password, saltRounds);
            })

        const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
        entities.password = bcrypt.hashSync(entities.password, saltRounds);
    }

    save(entities: CreateUserDTO[], options?: SaveOptions) : Promise<UserDTO[]>
    save(entity: CreateUserDTO, options?: SaveOptions) : Promise<UserDTO>
    save(entities: any, options?: SaveOptions): any {
        this.hashPassword(entities);
        return super.save(entities, options)
    }
}
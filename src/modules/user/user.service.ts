import { FindOneOptions, SaveOptions } from "typeorm";
import UserRepository from "./user.repository";
import UserDTO from "./dto/user.dto";
import CreateUserDTO from "./dto/createUser.dto";
import * as bcrypt from 'bcryptjs';
import UserEntity from "./user.entity";

export default class UserService {
    private userRepository: UserRepository = new UserRepository();

    constructor(){}

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
        return this.userRepository.save(entities, options)
    }

    findOne(options: FindOneOptions<UserEntity>) {
        return this.userRepository.findOne(options);
    }
}
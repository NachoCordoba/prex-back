import { SaveOptions } from "typeorm";
import UserRepository from "./user.repository";
import UserDTO from "./dto/user.dto";
import CreateUserDTO from "./dto/createUser.dto";
import * as bcrypt from 'bcryptjs';
import UserEntity from "./user.entity";
import CommonService from "../../lib/common/common.service";
import IUserRepository from "./interface/user.repository.interface";

export default class UserService extends CommonService<UserEntity> {
    constructor(private userRepository: IUserRepository = new UserRepository()){
        super(userRepository);
    }

    private hashPassword(password: string): string
    private hashPassword(password: string[]): string[]
    private hashPassword(password: string[] | string): string[] | string {
        if(Array.isArray(password))
            return password.map(pw => {
                const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
                return bcrypt.hashSync(pw, saltRounds);
            })

        const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_PASSWORD_ENCRYPT))
        return bcrypt.hashSync(password, saltRounds);
    }

    save(entity: CreateUserDTO, options?: SaveOptions) : Promise<UserDTO>
    save(entities: CreateUserDTO[], options?: SaveOptions) : Promise<UserDTO[]>
    save(entities: any, options?: SaveOptions): any {
        if(Array.isArray(entities)) return super.save(
            entities.map(entity => { return { ...entity, password: this.hashPassword(entity.password) }})
        )
        
        return super.save({ ...entities, password: this.hashPassword(entities.password) }, options)
    }
}
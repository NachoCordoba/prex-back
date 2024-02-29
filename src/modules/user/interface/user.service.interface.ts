import { SaveOptions } from "typeorm";
import ICommonService from "../../../lib/common/interface/common.service.interface";
import CreateUserDTO from "../dto/createUser.dto";
import UserDTO from "../dto/user.dto";

export default interface IUserService extends ICommonService<UserDTO> {
    save(entity: CreateUserDTO, options?: SaveOptions) : Promise<UserDTO>
    save(entities: CreateUserDTO[], options?: SaveOptions) : Promise<UserDTO[]>
    save(entities: any, options?: SaveOptions): any
}
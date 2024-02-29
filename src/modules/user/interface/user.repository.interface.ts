import ICommonRepository from "../../../lib/common/interface/common.repository.interface";
import UserEntity from "../user.entity";

export default interface IUserRepository extends ICommonRepository<UserEntity>  {}
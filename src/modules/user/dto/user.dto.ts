import CommonDTO from "../../../lib/common/common.dto";

export default class UserDTO extends CommonDTO {
    userName: string;
    email: string;
    password: string;
}
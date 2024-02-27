import CommonDTO from "../../../lib/common/common.dto";

export default class UserAuthDTO extends CommonDTO {
    userName: string;
    email: string;
    password: string;
}
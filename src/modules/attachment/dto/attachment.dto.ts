import CommonDTO from "../../../lib/common/common.dto";
import UserDTO from "../../user/dto/user.dto";

export default class AttachmentDTO extends CommonDTO {
    attachment: string;
    user: UserDTO;
    sharedTo: UserDTO[];
}
import CommonDTO from "../../../lib/common/common.dto";
import AttachmentDTO from "../../attachment/dto/attachment.dto";

export default class UserDTO extends CommonDTO {
    userName: string;
    email: string;
    password: string;
    attachments: AttachmentDTO[];
    sharedMe: AttachmentDTO[]
}
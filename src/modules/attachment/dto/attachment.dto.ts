import CommonDTO from "../../../lib/common/common.dto";
import UserDTO from "../../user/dto/user.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     Attachment:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: Owner
 *         attachment:
 *           type: string
 *           description: Attachment name
 *         sharedTo:
 *           type: array
 *           description: Attachment shared to users
 *       example:
 *         user: { id: 'example' }
 *         attachment: example.pdf
 *         sharedTo: [{ id: 'example123' }]
 *         
 */
export default class AttachmentDTO extends CommonDTO {
    attachment: string;
    user: UserDTO;
    sharedTo: UserDTO[];
}
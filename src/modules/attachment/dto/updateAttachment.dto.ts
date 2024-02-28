import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import ExistEntityAssignationDTO from "../../../lib/dto/existEntityAssignation.dto";
import { Type } from "class-transformer";

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateAttachment:
 *       type: object
 *       properties:
 *         attachment:
 *           type: string
 *           description: Attachment Name
 *         sharedTo:
 *           type: array
 *           properties:
 *             id:
 *               type: string
 *               description: UserId
 *           description: UserIds Array
 *         password:
 *           type: string
 *           description: User Password
 *       example:
 *         attachment: example
 *         sharedTo: [{ id: 'exampleUserId' }]
 *         
 */

export default class UpdateAttachmentDTO {

    constructor(updateAttachmentDTO: Partial<UpdateAttachmentDTO>){
        Object.assign(this, updateAttachmentDTO);
    }

    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    attachment?: string;

    @IsOptional()
    @Type(() => ExistEntityAssignationDTO)
    @ValidateNested({ each: true })
    sharedTo?: ExistEntityAssignationDTO[];
}
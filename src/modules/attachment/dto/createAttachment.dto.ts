import ExistEntityAssignationDTO from '../../../lib/dto/existEntityAssignation.dto';

export default class CreateAttachmentDTO {
    attachment: string;
    file: Express.Multer.File;
    user: ExistEntityAssignationDTO;
    createdBy: string;
}
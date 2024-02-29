import { PromiseResult } from "aws-sdk/lib/request";
import ICommonService from "../../../lib/common/interface/common.service.interface";
import AttachmentDTO from "../dto/attachment.dto";
import { AWSError, S3 } from "aws-sdk";
import UpdateAttachmentDTO from "../dto/updateAttachment.dto";
import { SaveOptions } from "typeorm";

export default interface IAttachmentService extends ICommonService<AttachmentDTO> {
    upload(file: Express.Multer.File): Promise<void>;
    download(fileName: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>>;
    
    update(entities: UpdateAttachmentDTO[], options?: SaveOptions) : Promise<AttachmentDTO[]>
    update(entity: UpdateAttachmentDTO, options?: SaveOptions) : Promise<AttachmentDTO>
    update(entities: any, options?: SaveOptions): Promise<any>
}
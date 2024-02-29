import CommonService from "../../lib/common/common.service";
import AttachmentEntity from "./attachment.entity";
import AttachmentRepository from "./attachment.repository";
import CreateAttachmentDTO from './dto/createAttachment.dto';
import AttachmentDTO from "./dto/attachment.dto";
import { SaveOptions } from "typeorm";
import UpdateAttachmentDTO from "./dto/updateAttachment.dto";
import FileSystem from "../../lib/fileSystem/fileSystem";
import IAttachmentService from "./interface/attachment.service.interface";
import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import IAttachmentRepository from "./interface/attachment.repository.interface";


export default class AttachmentService extends CommonService<AttachmentEntity> implements IAttachmentService{
    constructor(private attachmentRepository: IAttachmentRepository = new AttachmentRepository()){
        super(attachmentRepository);
    }

    async upload(file: Express.Multer.File): Promise<void>{
        try{
            await FileSystem.upload({ name: file.originalname, buffer: file.buffer })
        }
        catch(err){
            throw err;
        }
    }

    async download(fileName: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>>{
        try{
            return await FileSystem.download(fileName)
        }
        catch(err){
            throw err;
        }
    }

    async save(entities: CreateAttachmentDTO[], options?: SaveOptions) : Promise<AttachmentDTO[]>
    async save(entity: CreateAttachmentDTO, options?: SaveOptions) : Promise<AttachmentDTO>
    async save(entities: any, options?: SaveOptions): Promise<any> {
        if(Array.isArray(entities))
            return entities.map(async (entity) => {
                await this.upload(entity.file);
                return super.save({
                    attachment: entity.attachment,
                    user: entity.user,
                    createdBy: entity.createdBy
                }, options);
            })
        
        await this.upload(entities.file);
        return this.attachmentRepository.save({
            attachment: entities.attachment,
            user: entities.user,
            createdBy: entities.createdBy
        }, options);
    }

    async update(entities: UpdateAttachmentDTO[], options?: SaveOptions) : Promise<AttachmentDTO[]>
    async update(entity: UpdateAttachmentDTO, options?: SaveOptions) : Promise<AttachmentDTO>
    async update(entities: any, options?: SaveOptions): Promise<any> {
        if(Array.isArray(entities))
            return entities.map(async (entity) => {
                return super.save(entity, options);
            })
        
        return this.attachmentRepository.save(entities, options);
    }

    async delete(id: string){
        return this.attachmentRepository.softDelete(id);
    }
}
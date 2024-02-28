import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import CommonService from "../../lib/common/common.service";
import AttachmentEntity from "./attachment.entity";
import AttachmentRepository from "./attachment.repository";
import CreateAttachmentDTO from './dto/createAttachment.dto';
import AttachmentDTO from "./dto/attachment.dto";
import { SaveOptions } from "typeorm";
import UpdateAttachmentDTO from "./dto/updateAttachment.dto";

export default class AttachmentService extends CommonService<AttachmentEntity> {
    constructor(private attachmentRepository: AttachmentRepository = new AttachmentRepository){
        super(attachmentRepository);
    }

    async upload(file: Express.Multer.File){
        try{
            const s3 = new S3Client({
                credentials: {
                    accessKeyId: String(process.env.AWS_KEY), 
                    secretAccessKey: String(process.env.AWS_SECRET)
                },
                region: process.env.BUCKET_REGION
            })
            
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
            };
    
            const command = new ListBucketsCommand(params);
            await s3.send(command)
            s3.destroy();
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
                // await this.upload(entity.file);
                return super.save(entity, options);
            })
        
        // await this.upload(entities.file);
        return super.save(entities, options);
    }

    async update(entities: UpdateAttachmentDTO[], options?: SaveOptions) : Promise<AttachmentDTO[]>
    async update(entity: UpdateAttachmentDTO, options?: SaveOptions) : Promise<AttachmentDTO>
    async update(entities: any, options?: SaveOptions): Promise<any> {
        if(Array.isArray(entities))
            return entities.map(async (entity) => {
                return super.save(entity, options);
            })
        
        return super.save(entities, options);
    }

    async delete(id: string){
        return super.delete(id);
    }
}
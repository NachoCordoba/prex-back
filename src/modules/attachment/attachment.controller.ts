import { Request, Response } from "express";
import HttpPostException from "../../lib/exception/httpPost.exception";
import AttachmentService from './attachment.service';
import FileException from "./exception/file.exception";
import HttpStatusCode from "../../lib/enum/httpStatusCode.enum";
import UserDTO from "../user/dto/user.dto";
import AuthorizationException from "../../lib/exception/authorization.exception";
import UpdateAttachmentDTO from "./dto/updateAttachment.dto";
import { validateOrReject } from "class-validator";
import HttpGetException from '../../lib/exception/httpGet.exception';
import HttpDeleteException from '../../lib/exception/httpDelete.exception';

export default class AttachmentController {
    private static instance: AttachmentController;
    
    private constructor(private attachmentService: AttachmentService = new AttachmentService()){}

    public static getInstance(): AttachmentController {
        if(!this.instance)
            this.instance = new AttachmentController();

        return this.instance;
    }

    async attach(req: Request, res: Response){
        try{
            if(!req.file)
                throw new FileException()
           
            const savedFile = await this.attachmentService.save({
                file: req.file,
                attachment: req.file.originalname,
                user: req['user'] as UserDTO,
                createdBy: (req['user'] as UserDTO).email
            });       
            res.status(HttpStatusCode.OK);
            res.send({
                attachment: savedFile.attachment,
                user: savedFile.user,
                createdBy: savedFile.createdBy,
                lastModifiedBy: savedFile.lastModifiedBy,
                id: savedFile.id,
                createdDate: savedFile.createdDate,
                lastModifiedDate: savedFile.lastModifiedBy,
                deleteDate: savedFile.deleteDate,
            });
        }
        catch(err: any){
            new HttpPostException(err).toHttpResponse(res);
        }
    }

    async update(req: Request, res: Response){
        try{
            const attachmentId = req.params.id;
            const updateAttachmentDTO = new UpdateAttachmentDTO(req.body);
            await validateOrReject(updateAttachmentDTO);
            const attachment = await this.attachmentService.findOne({
                where: { id: attachmentId, user: { id: (req['user'] as UserDTO).id }}
            })

            if(!attachment) throw new AuthorizationException();

            const updatedAttachment = await this.attachmentService.update({ ...updateAttachmentDTO, id: attachmentId });
            res.status(HttpStatusCode.OK);
            res.send(updatedAttachment);
        }
        catch(err: any){
            new HttpPostException(err).toHttpResponse(res);
        }
    }

    async list(req: Request, res: Response){
        try{
            const attachmentList = await this.attachmentService.list(Number(req.query.page || 0), { where: [
                { user: { id: (req['user'] as UserDTO).id }},
                { sharedTo: { id: (req['user'] as UserDTO).id }}
            ]})

            res.status(HttpStatusCode.OK)
            res.send(attachmentList)
        }
        catch(err: any){
            new HttpGetException(err).toHttpResponse(res);
        }
    }

    async delete(req: Request, res: Response){
        try{
            const attachmentId = req.params.id;
            const attachment = await this.attachmentService.findOne({
                where: { id: attachmentId, user: { id: (req['user'] as UserDTO).id }}
            })

            if(!attachment) throw new AuthorizationException();
            await this.attachmentService.delete(attachment.id);
            res.sendStatus(HttpStatusCode.OK);            
        }
        catch(err: any){
            new HttpDeleteException(err).toHttpResponse(res);
        }
    }
}
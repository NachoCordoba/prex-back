import { Repository } from "typeorm";
import AttachmentEntity from "./attachment.entity";
import Database from "../../lib/database/database";

export default class AttachmentRepository extends Repository<AttachmentEntity> {
    constructor(){
        super(AttachmentEntity, Database.getInstance().getDataSource().manager);
    }
}
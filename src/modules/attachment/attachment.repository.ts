import AttachmentEntity from "./attachment.entity";
import Database from "../../lib/database/database";
import IAttachmentRepository from "./interface/attachment.repository.interface";
import ICommonRepository from "../../lib/common/interface/common.repository.interface";
import { FindOneOptions, DeepPartial, SaveOptions, FindManyOptions, ObjectId, FindOptionsWhere, UpdateResult, Repository } from "typeorm";

export default class AttachmentRepository implements IAttachmentRepository {
    constructor(private _repository: ICommonRepository<AttachmentEntity> = new Repository(AttachmentEntity, Database.getInstance().getDataSource().manager)){}
    
    findOne(options: FindOneOptions<AttachmentEntity>): Promise<AttachmentEntity | null> {
        return this._repository.findOne(options);
    }

    save(entities: DeepPartial<AttachmentEntity>[], options?: SaveOptions | undefined): Promise<AttachmentEntity[]>;
    save(entity: DeepPartial<AttachmentEntity>, options?: SaveOptions | undefined): Promise<AttachmentEntity>;
    save(entities: any, options?: SaveOptions | undefined) {
        return this._repository.save(entities, options);
    }

    findAndCount(options?: FindManyOptions<AttachmentEntity> | undefined): Promise<[AttachmentEntity[], number]> {
        return this._repository.findAndCount(options);
    }

    softDelete(criteria: string | string[] | ObjectId | ObjectId[] | FindOptionsWhere<AttachmentEntity>): Promise<UpdateResult> {
        return this._repository.softDelete(criteria);
    }
}
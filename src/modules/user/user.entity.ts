import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import CommonEntity from "../../lib/common/common.entity";
import AttachmentEntity from "../attachment/attachment.entity";

@Entity('user')
export default class UserEntity extends CommonEntity {
    @Column({
        nullable: false,
    })
    userName: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @OneToMany(() => AttachmentEntity, attachment => attachment.user)
    attachments: AttachmentEntity[];

    @ManyToMany(() => AttachmentEntity, attachment => attachment.sharedTo)
    sharedMe: AttachmentEntity[]
}
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import CommonEntity from "../../lib/common/common.entity";
import UserEntity from "../user/user.entity";

@Entity('attachment')
export default class AttachmentEntity extends CommonEntity {
    @Column({
        nullable: false
    })
    attachment: string;
    
    @ManyToOne(() => UserEntity, user => user.attachments, { nullable: false })
    @JoinColumn()
    user?: UserEntity;

    @ManyToMany(() => UserEntity, user => user.sharedMe)
    @JoinTable()
    sharedTo?: UserEntity[];
}
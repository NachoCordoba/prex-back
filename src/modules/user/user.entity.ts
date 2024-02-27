import { Column, Entity } from "typeorm";
import CommonEntity from "../../lib/common/common.entity";

@Entity('user')
export default class UserEntity extends CommonEntity {
    @Column({
        nullable: false
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
}
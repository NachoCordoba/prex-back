import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
    })
    createdBy: string;
    
    @CreateDateColumn({
        nullable: false,
    })
    createdDate: Date;
    
    @UpdateDateColumn()
    lastModifiedDate: Date;
    
    @Column({
        nullable: true,
    })
    lastModifiedBy: string;
    
    @DeleteDateColumn()
    deleteDate: Date;
}
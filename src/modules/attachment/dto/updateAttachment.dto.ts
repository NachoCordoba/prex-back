import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import ExistEntityAssignationDTO from "../../../lib/dto/existEntityAssignation.dto";
import { Type } from "class-transformer";

export default class UpdateAttachmentDTO {

    constructor(updateAttachmentDTO: Partial<UpdateAttachmentDTO>){
        Object.assign(this, updateAttachmentDTO);
    }

    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    attachment?: string;

    @IsOptional()
    @Type(() => ExistEntityAssignationDTO)
    @ValidateNested({ each: true })
    sharedTo?: ExistEntityAssignationDTO[];
}
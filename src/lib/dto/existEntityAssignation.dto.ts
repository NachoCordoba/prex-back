import { IsNotEmpty, IsString } from 'class-validator';

export default class ExistEntityAssignationDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

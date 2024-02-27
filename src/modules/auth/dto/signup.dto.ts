import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SignupDTO {

    constructor(signupDTO: Partial<SignupDTO>){
        Object.assign(this, signupDTO);
    }
    
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
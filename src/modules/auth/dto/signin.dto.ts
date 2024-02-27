import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SigninDTO {
    constructor(signinDTO: Partial<SigninDTO>){
        Object.assign(this, signinDTO);
    }

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
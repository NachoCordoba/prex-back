import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Signin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User Email 
 *         password:
 *           type: string
 *           description: User Password
 *       example:
 *         email: example@example.com
 *         password: example123
 *         
 */

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
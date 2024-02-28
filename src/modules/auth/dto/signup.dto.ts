import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Signup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *           description: User Full Name 
 *         email:
 *           type: string
 *           description: User Email 
 *         password:
 *           type: string
 *           description: User Password
 *       example:
 *         userName: example
 *         email: example@example.com
 *         password: example123
 *         
 */

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
import { Request, Response } from "express";
import AuthService from "./auth.service";
import SignupDTO from "./dto/signup.dto";
import { validateOrReject } from "class-validator";
import SigninDTO from "./dto/signin.dto";

export default class AuthController {
    private static instance: AuthController;
    private authService: AuthService;

    private constructor(){
        this.authService = new AuthService();
    }


    public static getInstance(): AuthController {
        if(!this.instance)
            this.instance = new AuthController();

        return this.instance;
    }

    async signup(req: Request, res: Response){
        try{
            const signupDTO = new SignupDTO(req.body);
            await validateOrReject(signupDTO);
            const signupUser = await this.authService.signup(signupDTO);
            res.status(201);
            res.send(signupUser);
        }
        catch(err){
            res.status(400)
            res.send(err)
        }
    }

    async signin(req: Request, res: Response){
        try{
            const signinDTO = new SigninDTO(req.body);
            await validateOrReject(signinDTO);
            const signinUser = await this.authService.signin(signinDTO);
            res.status(200);
            res.send(signinUser);
        }
        catch(err){
            res.status(400);
            res.send(err);
        }
    }
}
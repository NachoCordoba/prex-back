import UserService from "../user/user.service";
import SignupDTO from "./dto/signup.dto";
import jwt from 'jsonwebtoken';
import UserAuthDTO from "./dto/userAuth.dto";
import AccessTokenDTO from "./dto/accessToken.dto";
import SigninDTO from "./dto/signin.dto";
import * as bcrypt from 'bcryptjs';
import UnathorizedExpection from "../../lib/exception/authorization.exception";

export default class AuthService {
    constructor(private userService: UserService = new UserService()){}

    async signup(newUser: SignupDTO): Promise<AccessTokenDTO> {
       const user = await this.userService.save({
            ...newUser,
            createdBy: newUser.email
       })

       return {
            token: this.generateAccessToken(user)
       }
    }

    async signin(credentials: SigninDTO): Promise<AccessTokenDTO> {
        const user = await this.userService.findOne({
            where: { email: credentials.email }
        });

        if(!user) throw new UnathorizedExpection()
        if(!bcrypt.compareSync(credentials.password, user.password))
            throw new UnathorizedExpection();
        
        return {
            token: this.generateAccessToken(user)
        }
    }

    private generateAccessToken(user: UserAuthDTO){
        return jwt.sign(Object.assign({}, user), process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES })
    }
}
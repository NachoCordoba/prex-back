import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../lib/enum/httpStatusCode.enum";
import jwt from 'jsonwebtoken';
import UserDTO from "../modules/user/dto/user.dto";

export default (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization)
        return res.sendStatus(HttpStatusCode.UNAUTHORIZED);

    const token = getBearerTokenFromHeader(req.headers.authorization);

    jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
        if(err) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);

        req['user'] = user as UserDTO;
        next();
    })
}

const getBearerTokenFromHeader = (authToken: string) => {
    return authToken.split(" ")[1]
}
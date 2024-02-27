import express, { Request, Response, Router } from "express";
import AuthController from "./auth.controller";
const authRoutes : Router = express.Router();

authRoutes.post('/signup', (req: Request, res: Response) => AuthController.getInstance().signup(req, res));
authRoutes.post('/signin', (req: Request, res: Response) => AuthController.getInstance().signin(req, res));

export default express.Router().use('/auth', authRoutes)
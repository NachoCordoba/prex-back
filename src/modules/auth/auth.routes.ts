import express, { Request, Response, Router } from "express";
import AuthController from "./auth.controller";
const authRoutes : Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       200:
 *         description: Successfully signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  token:
 *                      type: string
 *                      description: Bearer Auth token
 */
authRoutes.post('/signup', (req: Request, res: Response) => AuthController.getInstance().signup(req, res));

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 * /auth/signin:
 *   post:
 *     summary: Signin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signin'
 *     responses:
 *       200:
 *         description: Successfully signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  token:
 *                      type: string
 *                      description: Bearer Auth token
 *       403:
 *         description: Failed login attempt.
 */
authRoutes.post('/signin', (req: Request, res: Response) => AuthController.getInstance().signin(req, res));

export default express.Router().use('/auth', authRoutes)
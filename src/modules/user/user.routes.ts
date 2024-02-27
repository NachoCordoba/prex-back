import express, { Router } from "express";
import UserController from "./user.controller";
const userRoutes : Router = express.Router();

userRoutes.get('/', (req, res) => {
    
});

export default express.Router().use('/user', userRoutes)
import { Request, Response } from "express";
import UserService from "./user.service";

export default class UserController {
    private static instance: UserController;
    private userService: UserService;

    private constructor(){
        this.userService = new UserService();
    }


    public static getInstance(): UserController {
        if(!this.instance)
            this.instance = new UserController();

        return this.instance;
    }
}
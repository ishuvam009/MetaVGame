import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "../config";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request,res: Response,next: NextFunction) => {

    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if(!token){
        res.status(403).json({
            message: "Unauthorized."
        })
        return
    }

    try {
        const decode = jwt.verify(token,JWT_PASSWORD) as {role: string, userId: string};
        req.userId = decode.userId;
    } catch (error) {
        
    }

}
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const adminMiddleware = (req: Request,res: Response,next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if(!token){
        res.status(403).json({
            message: "Unauthorized.",
        })
        return
    }

    try {
        const decode = jwt.verify(token, JWT_PASSWORD) as {role: string, userId: string};
        if(decode.role != "Admin"){
            res.status(403).json({
                message: "Unauthorized."
            })
        }
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Server Error."
        })
    }
}
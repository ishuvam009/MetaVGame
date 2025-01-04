import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const adminMiddleware = (req: Request,res: Response,next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if(!token){
        res.status(401).json({
            message: "Unauthorized.",
        })
        return
    }

    try {
        const decode = jwt.verify(token, JWT_PASSWORD) as {role: string, userId: string};
        req.userId = decode.userId;
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Server Error."
        })
    }
}
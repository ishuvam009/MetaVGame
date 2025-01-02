import { Router } from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { SigninSchema } from "../../types";
import { SignupSchema } from "../../types";
import client from "@repo/db/client";
import {hash, compare} from "../../scrypt";
import jwt from "jsonwebtoken";
import { date } from "zod";
import { JWT_PASSWORD } from "../../config";

export const router = Router();

router.post('/signup', async (req,res) => {
    const parsedData = SignupSchema.safeParse(req.body)
    if(!parsedData.success){
         res.status(400).json({
            message: "Validation failed."
        })
        return 
    }

    const hashedPassword = await hash(parsedData.data.password);

    try {
        const user = await client.user.create({
            data: {
                userName: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.type === "admin" ? "Admin" : "User",
            }
        })
    res.status(200).json({
        userId: user.id,
    })
    } catch (error) {
        res.status(400).json({
            message: 'User already exist.'
        })
    }
});

router.post('/signin', async (req,res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(403).json({
            message: "Valiadtion Failed.",
        })
        return
    }
    try {
        const user = await client.user.findUnique({
            where: {
                userName: parsedData.data.username,
            }
        })
        if(!user){
            res.status(403).json({
                message: "User not found.",
            })
            return
        }

        const isValidPassword = await compare(parsedData.data.password, user.password);

        if(!isValidPassword){
            res.status(403).json({
                message: "Invalid Password.",
            })
        }

        const jwtToken = jwt.sign({
            userName: user.userName,
            userId: user.id,
            role: user.role,
        }, JWT_PASSWORD);

        res.json({
            jwtToken
        })
        

    } catch (error) {
        res.status(400).json({
            message: "Internal server error."
        })
    }
});

router.get('/elements',(req,res) => {

});

router.get('/avatar',() => {

});

router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/space',spaceRouter);
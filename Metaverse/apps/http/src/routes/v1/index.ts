import { Router } from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { SigninSchema } from "../../types";
import { SignupSchema } from "../../types";
import client from "@repo/db/client";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import { date } from "zod";

export const router = Router();

router.post('/signup', async (req,res) => {
    const parsedData = SignupSchema.safeParse(req.body)
    if(!parsedData.success){
         res.status(400).json({
            message: "Validation failed."
        })
        return 
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password,10);

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

router.post('/signin', (req,res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(403).json({
            message: "Valiadtion Failed.",
        })
        return
    }
    try {
        const user = client.user.findUnique({
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

       
    } catch (error) {
        
    }
});

router.get('/elements',(req,res) => {

});

router.get('/avatar',() => {

});

router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/space',spaceRouter);
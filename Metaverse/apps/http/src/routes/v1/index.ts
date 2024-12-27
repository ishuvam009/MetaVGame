import { Router } from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { SigninSchema } from "../../types";
import { SignupSchema } from "../../types";
import client from "@repo/db/client";

export const router = Router();

router.post('/signup', (req,res) => {
    const parsedData = SignupSchema.safeParse(req.body)
    if(!parsedData.success){
         res.status(400).json({
            message: "Validation failed."
        })
        return 
    }else

    try {
        
    } catch (error) {
        
    }

    res.status(200).json({
        message: 'Signup Successful',
    })
});

router.post('/signin', (req,res) => {
    res.status(200).json({
        message: 'Signin Successful.',
    })
});

router.get('/elements',(req,res) => {

});

router.get('/avatar',() => {

});

router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/space',spaceRouter);
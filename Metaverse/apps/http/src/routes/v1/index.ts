import { Router } from "express";

export const router = Router();

router.get('/signup', (req,res) => {
    res.status(200).json({
        message: 'Signup Successful',
    })
});

router.get('/signin', (req,res) => {
    res.status(200).json({
        message: 'Signin Successful.',
    })
});
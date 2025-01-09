import { Router } from "express";
import { CreateSpaceSchema } from "../../types";

export const spaceRouter = Router();

spaceRouter.post('/', (req,res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({
            message: "Validation Failed."
        })
        return
    }
});

spaceRouter.delete('/:spaceId', (req,res) => {

});

spaceRouter.get('/all', (req,res) => {

});

spaceRouter.post('/element', (req,res) => {

});

spaceRouter.delete('/element', (req,res) =>{

});

spaceRouter.get('/:spaceId', (req,res) => {

});
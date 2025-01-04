import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import client from "@repo/db/client";

export const userRouter = Router();

userRouter.post("/metadata", (req,res) => {
    const parsedData = UpdateMetadataSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({
            message: "VAlidation Failed"
        })
        return
    }

    client.user.update;
})
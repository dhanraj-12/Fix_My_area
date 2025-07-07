import express from "express"
import { Request, Response } from "express";


const rootRouter = express.Router();

rootRouter.post("/", (req: Request,res:Response)=> {
    res.send("Eduscholar is working!!!!");
})

export default rootRouter;
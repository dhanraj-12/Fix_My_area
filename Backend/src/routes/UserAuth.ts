import express, { Request, Response } from "express";
import oauth2Client from "../util/googleconfig";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UsersModel from "../modals/UserModal";
import { asyncWrapProviders } from "async_hooks";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";


dotenv.config();

const authrouter = express.Router();

const authroutehandler = async (req: Request, res: Response) => {
    const code = req.query.code;
    console.log("Code from Frontend:", code);

    try {
        // 1. Get Google OAuth Tokens
        console.log("Getting token...");
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);
        console.log("Credential set.");

        // 2. Fetch User Info from Google
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );

        console.log("Authentication successful!");
        console.log(userRes.data);

        const { id, email, name, picture } = userRes.data;
        
        let user = await UsersModel.findOne({ email });
        if (!user) {
            user = await UsersModel.create({
                name,
                email,
                picture,
            });
        }


        const { _id } = user;
        console.log(_id);
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET, {
        });

        res.status(200).json({
            message: 'success',
            token,
            user,
        });

    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

authrouter.get("/google", authroutehandler);

export default authrouter;

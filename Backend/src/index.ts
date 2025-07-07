import express from "express"
import cors from "cors"
import rootRouter from "./routes/RootRoute";
import authrouter from "./routes/UserAuth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import imageRouter from "./routes/imageroute";
import AddIssuerouter from "./routes/AddIssueroute";
import AdminAuthRouter from "./routes/AdminAuth";
import citiesRouter from "./routes/cities";
import { all } from "axios";
import alladmineissueRouter from "./routes/Alladmineissue";
dotenv.config();


const Port = 3000;
const app = express();
app.use(cors())
app.use(express.json());

const db_uri = process.env.MONGO_URL;
const mongoconnect = async () => {

    try {
        await mongoose.connect(db_uri)
        console.log('Connected to MongoDB successfully!')
    } catch (err) {
        console.error('Error connecting to MongoDB:', err)
    }
}

mongoconnect();
app.use("/api", rootRouter);
app.use("/api", authrouter);
app.use("/api", imageRouter);
app.use("/api", AddIssuerouter)
app.use("/api", AdminAuthRouter);
app.use("/api",citiesRouter);
app.use("/api", alladmineissueRouter);


app.listen(Port, () => console.log("App is running on:", Port))
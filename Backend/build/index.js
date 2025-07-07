"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const RootRoute_1 = __importDefault(require("./routes/RootRoute"));
const UserAuth_1 = __importDefault(require("./routes/UserAuth"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageroute_1 = __importDefault(require("./routes/imageroute"));
const AddIssueroute_1 = __importDefault(require("./routes/AddIssueroute"));
const AdminAuth_1 = __importDefault(require("./routes/AdminAuth"));
const cities_1 = __importDefault(require("./routes/cities"));
const Alladmineissue_1 = __importDefault(require("./routes/Alladmineissue"));
dotenv_1.default.config();
const Port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const db_uri = process.env.MONGO_URL;
const mongoconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(db_uri);
        console.log('Connected to MongoDB successfully!');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});
mongoconnect();
app.use("/api", RootRoute_1.default);
app.use("/api", UserAuth_1.default);
app.use("/api", imageroute_1.default);
app.use("/api", AddIssueroute_1.default);
app.use("/api", AdminAuth_1.default);
app.use("/api", cities_1.default);
app.use("/api", Alladmineissue_1.default);
app.listen(Port, () => console.log("App is running on:", Port));

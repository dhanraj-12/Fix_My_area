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
const axios_1 = __importDefault(require("axios"));
const citiesRouter = express_1.default.Router();
const citiesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const country = req.params.country;
        const search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
        const response = yield axios_1.default.post("https://countriesnow.space/api/v0.1/countries/cities", { country });
        let cities = response.data.data;
        if (search) {
            cities = cities.filter(city => city.toLowerCase().includes(search));
        }
        res.json({ cities: cities.slice(0, 50) }); // Limit to 50 results
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch cities" });
        res.status(500).json({ error: "Failed to fetch cities" });
    }
});
citiesRouter.get("/cities/:country", citiesHandler);
exports.default = citiesRouter;

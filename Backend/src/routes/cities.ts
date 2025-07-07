import express from "express";
import axios from "axios";
import { Request, Response } from "express";

const citiesRouter = express.Router();

const citiesHandler = async (req: Request, res: Response) => {
  try {
    const country = req.params.country;
    const search = req.query.search?.toString().toLowerCase() || '';

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      { country }
    );

    let cities: string[] = response.data.data;
    if (search) {
      cities = cities.filter(city =>
        city.toLowerCase().includes(search)
      );
    }

    res.json({ cities: cities.slice(0, 50) }); // Limit to 50 results
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cities" });
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

citiesRouter.get("/cities/:country", citiesHandler);

export default citiesRouter;

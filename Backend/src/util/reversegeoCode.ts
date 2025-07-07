import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function reverseGeocodeOpenCage(lat: number, lng: number) {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  const res = await axios.get(url);
  const result = res.data.results[0];

  const address = result.formatted;
  const zone =
    result.components.suburb || result.components.city || "Unknown Zone";

  return {
    zone,
    address,
  };
}

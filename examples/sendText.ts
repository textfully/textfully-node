import { Textfully } from "../src/textfully";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get API key from environment variables
const apiKey = process.env.TEXTFULLY_API_KEY;

if (!apiKey) {
  throw new Error("TEXTFULLY_API_KEY environment variable is not set");
}

const textfully = new Textfully({ apiKey });

textfully.send({
  to: "+16175555555", // verified phone number,
  message: "Hello from tests!",
});

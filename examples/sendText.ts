import { Textfully } from "textfully";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get API key from environment variables
const apiKey = process.env.TEXTFULLY_API_KEY;
const toNumber = "your-verified-phone-number"; // Include international code (e.g. +1 for US/Canada)

if (!apiKey) {
  throw new Error("TEXTFULLY_API_KEY environment variable is not set");
}

const textfully = new Textfully({ apiKey });

const sendText = async () => {
  const response = await textfully.send({
    to: toNumber,
    text: "Hello, world!",
  });

  console.log(response);
};

sendText();

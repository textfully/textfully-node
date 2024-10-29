import { Textfully } from "../src/textfully";

const textfully = new Textfully({ apiKey: "tx_apikey" });

textfully.send({
  to: "+16178856037",
  message: "Hello from tests!",
});

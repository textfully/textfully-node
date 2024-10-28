import { Textfully } from "../textfully";
import { SendMessageResponse } from "../interfaces";

describe("Textfully", () => {
  let client: Textfully;
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    client = new Textfully({ apiKey: "test-api-key" });
    fetchMock = jest.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  describe("send", () => {
    it("should send a text message successfully", async () => {
      const mockResponse: SendMessageResponse = {
        id: "msg_123",
        status: "sent",
      };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await client.send({
        to: "+16178856037",
        message: "Hello from tests!",
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.textfully.dev/v1/messages",
        {
          method: "POST",
          headers: expect.any(Headers),
          body: JSON.stringify({
            to: "+16178856037",
            message: "Hello from tests!",
          }),
        }
      );
    });

    it("should handle API errors properly", async () => {
      const errorResponse = {
        name: "invalid_parameter",
        message: "Invalid phone number",
      };

      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => JSON.stringify(errorResponse),
      } as Response);

      const result = await client.send({
        to: "invalid",
        message: "Hello",
      });

      expect(result.data).toBeNull();
      expect(result.error).toEqual(errorResponse);
    });
  });
});

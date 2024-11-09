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

  describe("constructor", () => {
    it("should use default baseUrl when not provided", () => {
      const client = new Textfully({ apiKey: "test-key" });
      expect((client as any).baseUrl).toBe("https://api.textfully.dev/v1");
    });

    it("should use custom baseUrl when provided", () => {
      const client = new Textfully({
        apiKey: "test-key",
        baseUrl: "https://custom.api.com",
      });
      expect((client as any).baseUrl).toBe("https://custom.api.com");
    });
  });

  describe("HTTP methods", () => {
    const mockSuccessResponse = { success: true };
    const mockErrorResponse = {
      name: "validation_error",
      message: "Invalid request",
    };

    it("should handle GET requests", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      } as Response);

      const result = await client.get("/test");
      expect(result.data).toEqual(mockSuccessResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: "GET" })
      );
    });

    it("should handle POST requests", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      } as Response);

      const result = await client.post("/test", { data: "test" });
      expect(result.data).toEqual(mockSuccessResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ data: "test" }),
        })
      );
    });

    it("should handle PUT requests", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      } as Response);

      const result = await client.put("/test", { data: "test" });
      expect(result.data).toEqual(mockSuccessResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ data: "test" }),
        })
      );
    });

    it("should handle PATCH requests", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      } as Response);

      const result = await client.patch("/test", { data: "test" });
      expect(result.data).toEqual(mockSuccessResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify({ data: "test" }),
        })
      );
    });

    it("should handle DELETE requests", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      } as Response);

      const result = await client.delete("/test");
      expect(result.data).toEqual(mockSuccessResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: "DELETE" })
      );
    });
  });

  describe("error handling", () => {
    it("should handle network errors", async () => {
      fetchMock.mockRejectedValueOnce(new Error("Network error"));

      const result = await client.get("/test");
      expect(result.error).toEqual({
        name: "application_error",
        message: "Unable to fetch data. The request could not be resolved.",
      });
    });

    it("should handle non-JSON error responses", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "Internal Server Error",
        statusText: "Internal Server Error",
      } as Response);

      const result = await client.get("/test");
      expect(result.error).toEqual({
        name: "application_error",
        message:
          "Internal server error. We're unable to process your request right now, please try again later.",
      });
    });

    it("should handle malformed JSON error responses", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => "{{malformed json}}",
      } as Response);

      const result = await client.get("/test");
      expect(result.error).toEqual({
        name: "application_error",
        message:
          "Internal server error. We're unable to process your request right now, please try again later.",
      });
    });

    it("should handle Error instances in non-JSON responses", async () => {
      const customError = new Error("Custom error message");
      fetchMock.mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
        text: async () => {
          throw customError;
        },
      } as unknown as Response);

      const result = await client.get("/test");
      expect(result.error).toEqual({
        name: "application_error",
        message: "Custom error message",
      });
    });

    it("should handle non-Error exceptions in non-JSON responses", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
        text: async () => {
          throw "String error"; // non-Error exception
        },
      } as unknown as Response);

      const result = await client.get("/test");
      expect(result.error).toEqual({
        name: "application_error",
        message: "Bad Request",
      });
    });
  });

  describe("send", () => {
    it("should send a text message successfully", async () => {
      const mockResponse: SendMessageResponse = {
        id: "msg_123",
        status: "sent",
        sentAt: "2024-11-09T16:54:23.127072Z",
      };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await client.send({
        to: "+16175555555",
        text: "Hello from tests!",
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.textfully.dev/v1/messages",
        {
          method: "POST",
          headers: new Headers({
            Authorization: "Bearer test-api-key",
            "User-Agent": "textfully-node/0.1.0",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            to: "+16175555555",
            text: "Hello from tests!",
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
        text: "Hello",
      });

      expect(result.data).toBeNull();
      expect(result.error).toEqual(errorResponse);
    });

    it("should transform camelCase to snake_case in requests", async () => {
      const mockResponse: SendMessageResponse = {
        id: "msg_123",
        status: "sent",
        sentAt: "2024-11-09T16:54:23.127072Z",
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await client.send({
        to: "+16175555555",
        text: "Hello!",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.textfully.dev/v1/messages",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            to: "+16175555555",
            text: "Hello!",
          }),
        })
      );
    });
  });
});

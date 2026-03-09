const multer = require("multer");

// Mock multer
jest.mock("multer", () => {
  const multerInstance = {
    single: jest.fn(),
    array: jest.fn(),
    fields: jest.fn(),
    any: jest.fn(),
  };
  const mockMulter = jest.fn(() => multerInstance);
  mockMulter.memoryStorage = jest.fn(() => "mockMemoryStorage");
  return mockMulter;
});

describe("File Middleware Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should configure multer with memory storage and 3MB file size limit", () => {
    // Require the middleware here to ensure it uses the mock after setup
    const upload = require("../src/middlewares/file.middleware.js");

    // Verify memoryStorage was called
    expect(multer.memoryStorage).toHaveBeenCalledTimes(1);

    // Verify multer was configured correctly
    expect(multer).toHaveBeenCalledWith({
      storage: "mockMemoryStorage",
      limits: {
        fileSize: 1024 * 1024 * 3, // 3MB
      },
    });

    // Verify that the middleware exports the multer instance
    expect(upload).toHaveProperty("single");
    expect(upload).toHaveProperty("array");
  });
});

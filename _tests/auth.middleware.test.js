const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../src/models/blacklist.model");
const { authUser } = require("../src/middlewares/auth.middleware");

// Mock the dependencies
jest.mock("jsonwebtoken");
jest.mock("../src/models/blacklist.model");

describe("Auth Middleware Tests", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Set a dummy JWT_SECRET_KEY
    process.env.JWT_SECRET_KEY = "testsecret";
  });

  it("should return 401 if no token is provided", async () => {
    await authUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token not provided." });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is blacklisted", async () => {
    req.cookies.token = "blacklistedToken";

    // Mock that token is blacklisted
    tokenBlacklistModel.findOne.mockResolvedValue({
      token: "blacklistedToken",
    });

    await authUser(req, res, next);

    expect(tokenBlacklistModel.findOne).toHaveBeenCalledWith({
      token: "blacklistedToken",
    });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "token is invalid" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token verification fails", async () => {
    req.cookies.token = "invalidToken";

    // Mock that token is not blacklisted
    tokenBlacklistModel.findOne.mockResolvedValue(null);

    // Mock jwt.verify to throw an error
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    await authUser(req, res, next);

    expect(tokenBlacklistModel.findOne).toHaveBeenCalledWith({
      token: "invalidToken",
    });
    expect(jwt.verify).toHaveBeenCalledWith("invalidToken", "testsecret");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
    expect(next).not.toHaveBeenCalled();
  });

  it("should attach decoded user to req and call next if token is valid", async () => {
    req.cookies.token = "validToken";
    const mockDecodedUser = { id: "user123", username: "testuser" };

    // Mock that token is not blacklisted
    tokenBlacklistModel.findOne.mockResolvedValue(null);

    // Mock jwt.verify to return decoded user
    jwt.verify.mockReturnValue(mockDecodedUser);

    await authUser(req, res, next);

    expect(tokenBlacklistModel.findOne).toHaveBeenCalledWith({
      token: "validToken",
    });
    expect(jwt.verify).toHaveBeenCalledWith("validToken", "testsecret");
    expect(req.user).toEqual(mockDecodedUser);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

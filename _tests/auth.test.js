const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const userModel = require("../src/models/user.model");

// Mock the database connection
jest.mock("../src/config/db", () => jest.fn().mockResolvedValue(true));

// Mock the user model
jest.mock("../src/models/user.model");

describe("Auth Routes Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Close mongoose connection if needed
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });

  describe("POST /api/auth/register", () => {
    const validUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    it("should register a new user successfully", async () => {
      // Mock that user doesn't exist
      userModel.findOne.mockResolvedValue(null);
      
      // Mock user creation
      const mockUser = {
        _id: "userId123",
        username: validUser.username,
        email: validUser.email,
        password: "hashedpassword",
      };
      
      // Mock bcrypt hash
      jest.spyOn(require("bcryptjs"), "hash").mockResolvedValue("hashedpassword");
      
      // Mock jwt sign
      jest.spyOn(require("jsonwebtoken"), "sign").mockReturnValue("mockToken");
      
      // Mock userModel.create
      userModel.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth/register")
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully");
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    it("should return 400 if username is missing", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("All fields are required");
    });

    it("should return 400 if email is missing", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "testuser", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("All fields are required");
    });

    it("should return 400 if password is missing", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "testuser", email: "test@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("All fields are required");
    });

    it("should return 400 if user already exists", async () => {
      userModel.findOne.mockResolvedValue({
        _id: "existingUserId",
        username: validUser.username,
        email: validUser.email,
      });

      const response = await request(app)
        .post("/api/auth/register")
        .send(validUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists with this username or email");
    });
  });

  describe("POST /api/auth/login", () => {
    const validLogin = {
      email: "test@example.com",
      password: "password123",
    };

    it("should login user successfully", async () => {
      const mockUser = {
        _id: "userId123",
        username: "testuser",
        email: validLogin.email,
        password: "hashedpassword",
      };

      userModel.findOne.mockResolvedValue(mockUser);
      
      // Mock bcrypt compare
      jest.spyOn(require("bcryptjs"), "compare").mockResolvedValue(true);
      
      // Mock jwt sign
      jest.spyOn(require("jsonwebtoken"), "sign").mockReturnValue("mockToken");

      const response = await request(app)
        .post("/api/auth/login")
        .send(validLogin);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User logged in successfully");
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    it("should return 400 if email is missing", async () => {
      // Mock findOne to return null when email is undefined
      userModel.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post("/api/auth/login")
        .send({ password: "password123" });

      // Email is undefined, findOne returns null
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should return 400 if user not found", async () => {
      userModel.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post("/api/auth/login")
        .send(validLogin);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should return 400 if password is invalid", async () => {
      const mockUser = {
        _id: "userId123",
        username: "testuser",
        email: validLogin.email,
        password: "hashedpassword",
      };

      userModel.findOne.mockResolvedValue(mockUser);
      
      // Mock bcrypt compare to return false (invalid password)
      jest.spyOn(require("bcryptjs"), "compare").mockResolvedValue(false);

      const response = await request(app)
        .post("/api/auth/login")
        .send(validLogin);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });
  });
});


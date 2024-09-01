import request from "supertest";
import app from "../src/index";
import User from "../src/models/user.model";
import { mockUser } from "./mocks/userData.mock";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("UserController", () => {
  describe("registerUser", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/users/signup")
        .send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(mockUser.email);
    });

    it("should not register a user with existing email", async () => {
      const hashedPassword = await bcrypt.hash(mockUser.password, 10);
      await new User({ ...mockUser, password: hashedPassword }).save();
      const response = await request(app)
        .post("/api/users/signup")
        .send(mockUser);

      expect(response.status).toBe(400);
    });
  });

  describe("loginUser", () => {
    it("should authenticate user and return JWT", async () => {
      const hashedPassword = await bcrypt.hash(mockUser.password, 10);
      await new User({ ...mockUser, password: hashedPassword }).save();

      const response = await request(app).post("/api/users/login").send({
        email: mockUser.email,
        password: mockUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it("should reject invalid login", async () => {
      const userData = {
        email: "wrong@example.com",
        password: "wrongpassword",
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(userData);

      expect(response.status).toBe(401);
    });
  });
});

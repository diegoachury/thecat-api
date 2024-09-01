import { UserInterface } from "../../src/interfaces/user.interface";

export const mockUser: UserInterface = {
  firstName: "Test",
  lastName: "User",
  username: "testuser",
  email: "test@example.com",
  password: "securePassword",
  createdAt: new Date(),
  updatedAt: new Date(),
};

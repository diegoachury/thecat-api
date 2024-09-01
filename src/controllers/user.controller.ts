import e, { Request, Response } from "express";
import User from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const createUser = async (req: Request, res: Response) => {
  const userDetails: UserInterface = req.body;
  try {
    const newUser = new User(userDetails);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userDetails: UserInterface = req.body;
    const userExists = await User.findOne({ email: userDetails.email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
    const user = new User(userDetails);
    await user.save();
    res.status(201).send(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ _id: user._id, email, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

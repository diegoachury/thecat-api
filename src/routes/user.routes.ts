import { Router } from "express";
import {
  createUser,
  registerUser,
  loginUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/users", createUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;

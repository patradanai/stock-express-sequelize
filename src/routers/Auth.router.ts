import express from "express";
import * as AuthController from "../controllers/Auth.controller";
const router = express.Router();

// Example localhost:3000/auth/signin
router.post("/signin", AuthController.SignIn);

// Example localhost:3000/auth/signup
router.post("/signup", AuthController.SignUp);

export default router;

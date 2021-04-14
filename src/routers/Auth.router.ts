import express from "express";
import * as AuthController from "../controllers/Auth.controller";
const router = express.Router();

router.post("/signin", AuthController.SignIn);

router.post("/signup", AuthController.SignUp);

export default router;

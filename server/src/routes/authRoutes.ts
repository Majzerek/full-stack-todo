import express from "express";
import { loginUser, registerUser } from "../controllers/authController";

const routerAuth = express.Router();

routerAuth.post("/register-user", registerUser);

routerAuth.post("/login", loginUser);

export default routerAuth;

import express from "express";
import { getUser } from "../controllers/usersController";


const routerUser = express.Router();

routerUser.get('/user/:id', getUser);

export default routerUser;
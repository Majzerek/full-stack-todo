import express from "express";
import { getUser, updateUser } from "../controllers/usersController";


const routerUser = express.Router();

routerUser.get('/:id', getUser);
routerUser.post("/:id/update", updateUser)

export default routerUser;
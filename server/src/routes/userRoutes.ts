import express from "express";
import { getUser, getRole, updateUser } from "../controllers/usersController";


const routerUser = express.Router();

routerUser.get('/:id', getUser);
routerUser.get('/role/:id', getRole);
routerUser.post("/:id/update", updateUser);

export default routerUser;
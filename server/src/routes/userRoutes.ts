import express from "express";
import { getUser, getRole, updateUser, getUserTasks } from "../controllers/usersController";


const routerUser = express.Router();

routerUser.get('/:id', getUser);
routerUser.get('/role/:id', getRole);
routerUser.post("/:id/update", updateUser);
routerUser.get("/tasks/:id", getUserTasks);

export default routerUser;
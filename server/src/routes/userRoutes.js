"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const routerUser = express_1.default.Router();
routerUser.get('/:id', usersController_1.getUser);
routerUser.get('/role/:id', usersController_1.getRole);
routerUser.post("/:id/update", usersController_1.updateUser);
routerUser.get("/tasks/:id", usersController_1.getUserTasks);
exports.default = routerUser;

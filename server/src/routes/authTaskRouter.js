"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authTaskController_1 = require("../controllers/authTaskController");
const routerAuthTask = express_1.default.Router();
routerAuthTask.post('/register-task', authTaskController_1.registerTask);
routerAuthTask.post('/completed', authTaskController_1.completedTask);
routerAuthTask.delete('/delete/:taskId', authTaskController_1.deleteTask);
exports.default = routerAuthTask;

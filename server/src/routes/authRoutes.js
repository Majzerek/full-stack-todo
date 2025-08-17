"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const routerAuth = express_1.default.Router();
routerAuth.post('/register-user', authController_1.registerUser);
routerAuth.post('/login', authController_1.loginUser);
exports.default = routerAuth;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRouter = express_1.default.Router();
adminRouter.get('/statistics', adminController_1.getUsersStatistics);
adminRouter.post('/update-status/:userId', adminController_1.postUserUpdateStatus);
exports.default = adminRouter;

import express from "express";
import {
  getUsersStatistics,
  postUserUpdateStatus,
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.get("/statistics", getUsersStatistics);
adminRouter.post("/update-status/:userId", postUserUpdateStatus);

export default adminRouter;

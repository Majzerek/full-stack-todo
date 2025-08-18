import express from "express";
import {
  completedTask,
  deleteTask,
  registerTask,
} from "../controllers/authTaskController";
import { registerUser, loginUser } from "../controllers/authController";
import {
  getUsersStatistics,
  postUserUpdateStatus,
} from "../controllers/adminController";
import {
  getUser,
  getRole,
  updateUser,
  getUserTasks,
} from "../controllers/usersController";

const router = express.Router();
//auth
router.post("/register-user", registerUser);
router.post("/login", loginUser);

//auth admin
router.get("/statistics", getUsersStatistics);
router.post("/update-status/:userId", postUserUpdateStatus);

//auth task
router.post("/register-task", registerTask);
router.post("/completed", completedTask);
router.delete("/delete/:taskId", deleteTask);

//user
router.get("/:id", getUser);
router.get("/role/:id", getRole);
router.post("/:id/update", updateUser);
router.get("/tasks/:id", getUserTasks);

export default router;

import express from 'express';
import { completedTask, deleteTask, registerTask } from '../controllers/authTaskController';

const routerAuthTask = express.Router();

routerAuthTask.post('/register-task',  registerTask);
routerAuthTask.post('/completed', completedTask);
routerAuthTask.delete('/delete/:taskId', deleteTask);

export default routerAuthTask;
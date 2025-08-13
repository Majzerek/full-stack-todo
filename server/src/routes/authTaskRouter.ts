import express from 'express';
import { completedTask, registerTask } from '../controllers/authTaskController';


const routerAuthTask = express.Router();

routerAuthTask.post('/register-task', registerTask);
routerAuthTask.post('/completed', completedTask);

export default routerAuthTask;
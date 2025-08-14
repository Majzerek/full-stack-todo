import { Request, Response } from "express";
import { connectToDatabase } from "../db/db";
import { TaskDbType } from "../types";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../types/typeExpress";


export const registerTask = async (req: Request, res: Response) => {

  try {
    const registerData = { ...req.body, isDone: false };
 
    const db = await connectToDatabase();
    const taskCollection = db.collection<TaskDbType>('tasks');

    await taskCollection.insertOne(registerData);
    return res.status(200).send({message:'Task created'});
  } catch (err) {
    console.error(err);
    return res.status(504).send({ message: "Sorry something went wrong." });
  }

};

export const completedTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const taskData = req.body;
    if(!taskData) return res.status(404).send({message: "No required data."});

    const {isDone, ...rest} = taskData;
    const registerData = {...rest, isDone:true};

    const db = await connectToDatabase();
    const taskCollection = db.collection<TaskDbType>('tasks');

    const task = await taskCollection.findOne({ _id: new ObjectId(registerData.id) });

    if (!task) {
      return res.status(404).send({ message: 'No task data' });
    }


    await taskCollection.updateOne({ _id: new ObjectId(task._id) },
      {
        $set: {
          ...registerData
        },

      });
    return res.status(200).send({ message: 'Task Successfully Completed' });
  }

  catch (err) {
    console.error(err);
    return res.status(504).send({ message: "Something went wrong." });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskID = req.params.taskId;
    if(!taskID) return res.status(404).send({message: "No requaired data."});

    const db = await connectToDatabase();
    const taskCollection = db.collection<TaskDbType>('tasks');

    const task = await taskCollection.findOne({ _id: new ObjectId(taskID) });

    if (!task) {
      return res.status(404).send({ message: 'No task data' });
    }
    await taskCollection.deleteOne({"_id":task._id});

    return res.status(200).send({ message: 'Task Successfully Deleted' });
  }

  catch (err) {
    console.error(err);
    return res.status(504).send({ message: "Something went wrong." });
  }
};

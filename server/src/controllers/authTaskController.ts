import { Request, Response } from "express";
import { connectToDatabase } from "../db/db";
import { TaskDbType } from "../types";
import { ObjectId } from "mongodb";


export const registerTask = async (req: Request, res: Response) => {

  try {
    const registerData = { ...req.body, isDone: false };
    const db = await connectToDatabase();
    const taskCollection = db.collection<TaskDbType>('tasks');


    await taskCollection.insertOne(registerData);
    return res.status(200).send('Task created');
  } catch (err) {
    console.error(err);
    return res.status(504).send({ message: "Sorry something went wrong." });
  }

};

export const completedTask = async (req: Request, res: Response) => {
  try {
    const taskData = req.body;

    const db = await connectToDatabase();
    const taskCollection = db.collection<TaskDbType>('tasks');

    const task = await taskCollection.findOne({ _id: new ObjectId(taskData.id) });

    if (!task) {
      return res.status(404).send({ message: 'No task data' });
    }


    await taskCollection.updateOne({ _id: new ObjectId(task._id) },
      {
        $set: {
          ...taskData
        },

      });
    return res.status(200).send({ message: 'Invoice Details Update' });
  }

  catch (err) {
    console.error(err);
    return res.status(504).send({ message: "Something went wrong." });
  }
};
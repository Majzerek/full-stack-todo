import { UserDbType } from "../types";
import { connectToDatabase } from "../db/db";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const getUser = async (req:Request, res:Response) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    return res.status(200).send(user);
  } catch (err) {
    console.error("ERR", err);
    return res.status(404).send('User not found');
  }
};


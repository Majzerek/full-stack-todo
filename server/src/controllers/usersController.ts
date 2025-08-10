import { UserDbType } from "../types";
import { connectToDatabase } from "../db/db";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const getUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return;
    const { password,  _id,role, ...rest } = user;
    const data = {id: user._id,...rest};
    return res.status(200).send(data);
  } catch (err) {
    console.error("ERR", err);
    return res.status(404).send({message:'User not found'});
  }
};

export const updateUser = async (req: Request, res: Response) => {

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');

    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({message:'Invalid user ID'});
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return res.status(404).send({message:'User not found'});
    }
    

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...req.body
        },

      });

    return res.status(200).send({message:'Update complete'});
  } catch (err) {
    return res.status(500).send({message: 'Internal Server Error'});
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return;
    const { password,  _id, role, ...rest } = user;
    return res.status(200).send(role);
  } catch (err) {
    console.error("ERR", err);
    return res.status(404).send({message:'User not found'});
  }
  
};
import { ObjectId } from "mongodb";


export type TaskDbType = {
  _id: ObjectId;
  title: string;
  description: string;
  hashTag: string[];
  userDate: string;
  createAt: string;
  isDone: boolean;
  allowedUser: string;
}


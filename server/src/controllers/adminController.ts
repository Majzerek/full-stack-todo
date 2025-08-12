import { format } from "date-fns";
import { StatusEnum } from "../types/RoleEnum";
import { connectToDatabase } from "../db/db";
import { UserDbType, UsersStatisticType } from "../types";
import { Response, Request } from "express";
import { ObjectId } from "mongodb";

type UsersQuery = {
  date?: string
}
const statusObjMap: Record<StatusEnum, 'ACTIVE' | 'DECLINED' | 'PENDING'> = {
  [StatusEnum.ACTIVE]: 'ACTIVE',
  [StatusEnum.DECLINED]: 'DECLINED',
  [StatusEnum.PENDING]: 'PENDING'
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const getUsersStatistics = async (req: Request<{}, {}, {}, UsersQuery>, res: Response) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');

    const filters = format(new Date(), "MM/yyyy");
    const usersList = (await usersCollection.find().toArray()).map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    const filteredUsers = usersList.reduce<Record<StatusEnum.ACTIVE | StatusEnum.PENDING | StatusEnum.DECLINED, {
      new: number,
      users: UsersStatisticType[]
    }>>((acc, user) => {
      const userJoinedDate = format(user.joined, 'MM/yyyy');

      const state = statusObjMap[user.status as StatusEnum];
      acc[state].users.push(user);

      if (userJoinedDate === filters) {
        acc[state].new++;
      }

      return acc;

    }, { ACTIVE: { new: 0, users: [] }, PENDING: { new: 0, users: [] }, DECLINED: { new: 0, users: [] } });

    return res.status(200).send(filteredUsers);
  } catch (err) {
    console.error("ERR:", err);
    return res.status(404).send({ message: 'Not found users' });
  }
};

export const postUserUpdateStatus = async (req: Request, res: Response) => {

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.userId) });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          ...req.body
        },

      });

    return res.status(200).send({message: 'Update complete'});
  } catch (err) {
    console.error("ERR: ",err);
    return res.status(500).send({message: 'Internal Server Error'});
  };
};
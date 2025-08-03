import { Collection, ObjectId } from "mongodb"

import { Request, Response } from "express";
import { UserDbType } from "../types";
import { StatusEnum } from "../types/RoleEnum";



export class UserController {

    constructor(private usersCollection: Collection<UserDbType>) {
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!user) {
                throw new Error('err')
            }
            return res.status(200).send(user)
        } catch (err) {
            return res.status(404).send(err)
        }
    };

    async getUserInfo(req: Request, res: Response) {
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!user) {
                return res.status(404).send({message: 'User not found'});
            }
            const { _id, password, ...restUser } = user;
            return res.status(200).send(restUser);
        } catch (err) {
            return res.status(404).send(err)
        }
    };

    async getUserList(req: Request, res: Response) {
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!user) {
                return res.status(404).send({message: 'User not found'});
            }
            const { password, phoneNumber, ...restUser } = user;
            return res.status(200).send([restUser])
        }
        catch (err) {
            return res.status(404).send(err)
        }
    };

    async getUserRole(req: Request, res: Response) {
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!user) {
                return res.status(404).send({message: 'User not found'});
            }

            const { role } = user;
            return res.status(200).send(role)
        } catch (err) { return res.status(404).send(err) }
    };

    async getAwatingUsers(req: Request, res: Response) {
        try {
            const usersList = (await this.usersCollection.find().toArray())
            const pendingUsers = usersList.filter((status) => status.status === StatusEnum.PENDING).length;

            return res.status(200).send(pendingUsers.toString())
        } catch (err) { return res.status(404).send(err) }
    };

    async getAwatingUserList(req: Request, res: Response) {
        try {
            const usersList = (await this.usersCollection.find().toArray()).map(({ _id, ...rest }) => ({ id: _id, ...rest }))

            const data = {
                pending: usersList.filter((status) => status.status === StatusEnum.PENDING),
                active: usersList.filter((status) => status.status === StatusEnum.ACTIVE),
                declined: usersList.filter((status) => status.status === StatusEnum.DECLINED)

            }
            return res.status(200).send(data)
        } catch (err) { return res.status(404).send(err) }
    };

    async getUsersToPermit(req: Request, res: Response) {
        try {
            const usersList = (await this.usersCollection.find().toArray()).map(({ _id, ...rest }) => ({ id: _id, ...rest }))
            const data = usersList.filter((user) => ((user.id).toString() !== req.params.userId && user.status === StatusEnum.ACTIVE))

            return res.status(200).send(data)

        } catch (err) { return res.status(404).send(err) }
    };


    async setUpdateById(req: Request, res: Response) {
        const userId = req.params.id;

        if (!ObjectId.isValid(userId!)) {
            throw new Error('Invalid user ID');
        }
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.id) })

            if (!user) { throw new Error('User not found') }

            await this.usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set: {
                        ...req.body
                    },

                });

            return res.status(200).send({ message: 'Update complete' });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    };


    async setUserTaxInfo(req: Request, res: Response) {
        const id = req.params.id;
        if (!ObjectId.isValid(id!)) {
            return res.status(400).send({ message: 'Invalid user ID' })
        }
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(id) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            await this.usersCollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        taxInfo: { ...req.body }
                    },
                })

            return res.status(200).send({ message: 'Update complete' });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    };

    async updateUserStatus(req: Request, res: Response) {
        try {
            const user = await this.usersCollection.findOne({ _id: new ObjectId(req.params.userId) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }


            await this.usersCollection.updateOne(
                { _id: new ObjectId(user._id) },
                {
                    $set: {
                        ...req.body
                    },

                });

            return res.status(200).send({ message: 'Update complete' });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    };
}
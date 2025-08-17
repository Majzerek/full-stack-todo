"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserUpdateStatus = exports.getUsersStatistics = void 0;
const date_fns_1 = require("date-fns");
const RoleEnum_1 = require("../types/RoleEnum");
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const statusObjMap = {
    [RoleEnum_1.StatusEnum.ACTIVE]: 'ACTIVE',
    [RoleEnum_1.StatusEnum.DECLINED]: 'DECLINED',
    [RoleEnum_1.StatusEnum.PENDING]: 'PENDING'
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const getUsersStatistics = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const filters = (0, date_fns_1.format)(new Date(), "MM/yyyy");
        const usersList = (await usersCollection.find().toArray()).map(({ _id, ...rest }) => ({ id: _id, ...rest }));
        const filteredUsers = usersList.reduce((acc, user) => {
            const userJoinedDate = (0, date_fns_1.format)(user.joined, 'MM/yyyy');
            const state = statusObjMap[user.status];
            acc[state].users.push(user);
            if (userJoinedDate === filters) {
                acc[state].new++;
            }
            return acc;
        }, { ACTIVE: { new: 0, users: [] }, PENDING: { new: 0, users: [] }, DECLINED: { new: 0, users: [] } });
        return res.status(200).send(filteredUsers);
    }
    catch (err) {
        console.error("ERR:", err);
        return res.status(404).send({ message: 'Not found users' });
    }
};
exports.getUsersStatistics = getUsersStatistics;
const postUserUpdateStatus = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: new mongodb_1.ObjectId(req.params.userId) });
        if (!user) {
            return res.status(404).send('User not found');
        }
        await usersCollection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, {
            $set: {
                ...req.body
            },
        });
        return res.status(200).send({ message: 'Update complete' });
    }
    catch (err) {
        console.error("ERR: ", err);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
    ;
};
exports.postUserUpdateStatus = postUserUpdateStatus;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.getRole = exports.updateUser = exports.getUser = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const getUser = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (!user)
            return;
        const { password, _id, role, ...rest } = user;
        const data = { id: user._id, ...rest };
        return res.status(200).send(data);
    }
    catch (err) {
        console.error("ERR", err);
        return res.status(404).send({ message: 'User not found' });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const userId = req.params.id;
        if (!mongodb_1.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }
        const user = await usersCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        await usersCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, {
            $set: {
                ...req.body
            },
        });
        return res.status(200).send({ message: 'Update complete' });
    }
    catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.updateUser = updateUser;
const getRole = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (!user)
            return;
        const { password, _id, role, ...rest } = user;
        return res.status(200).send(role);
    }
    catch (err) {
        console.error("ERR", err);
        return res.status(404).send({ message: 'User not found' });
    }
};
exports.getRole = getRole;
const getUserTasks = async (req, res) => {
    const userId = req.params.id;
    try {
        const db = await (0, db_1.connectToDatabase)();
        const taskCollection = db.collection('tasks');
        const tasks = (await taskCollection.aggregate([
            {
                $match: {
                    "allowedUser": userId,
                }
            }
        ]).toArray()).map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            userDate: task.userDate,
            createAt: task.createAt,
            hashTag: task.hashTag,
            isDone: task.isDone
        }));
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!tasks) {
            return res.status(404).send({ message: "Tasks data not found" });
        }
        return res.status(200).send(tasks);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Something went wrong.' });
    }
};
exports.getUserTasks = getUserTasks;

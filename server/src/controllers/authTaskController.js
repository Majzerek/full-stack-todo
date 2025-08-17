"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.completedTask = exports.registerTask = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const registerTask = async (req, res) => {
    try {
        const registerData = { ...req.body, isDone: false };
        const db = await (0, db_1.connectToDatabase)();
        const taskCollection = db.collection('tasks');
        await taskCollection.insertOne(registerData);
        return res.status(200).send({ message: 'Task created' });
    }
    catch (err) {
        console.error(err);
        return res.status(504).send({ message: "Sorry something went wrong." });
    }
};
exports.registerTask = registerTask;
const completedTask = async (req, res) => {
    try {
        const taskData = req.body;
        if (!taskData)
            return res.status(404).send({ message: "No required data." });
        const { isDone, ...rest } = taskData;
        const registerData = { ...rest, isDone: true };
        const db = await (0, db_1.connectToDatabase)();
        const taskCollection = db.collection('tasks');
        const task = await taskCollection.findOne({ _id: new mongodb_1.ObjectId(registerData.id) });
        if (!task) {
            return res.status(404).send({ message: 'No task data' });
        }
        await taskCollection.updateOne({ _id: new mongodb_1.ObjectId(task._id) }, {
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
exports.completedTask = completedTask;
const deleteTask = async (req, res) => {
    try {
        const taskID = req.params.taskId;
        if (!taskID)
            return res.status(404).send({ message: "No requaired data." });
        const db = await (0, db_1.connectToDatabase)();
        const taskCollection = db.collection('tasks');
        const task = await taskCollection.findOne({ _id: new mongodb_1.ObjectId(taskID) });
        if (!task) {
            return res.status(404).send({ message: 'No task data' });
        }
        await taskCollection.deleteOne({ "_id": task._id });
        return res.status(200).send({ message: 'Task Successfully Deleted' });
    }
    catch (err) {
        console.error(err);
        return res.status(504).send({ message: "Something went wrong." });
    }
};
exports.deleteTask = deleteTask;

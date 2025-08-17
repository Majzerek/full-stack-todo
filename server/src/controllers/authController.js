"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = require("bcrypt");
const RoleEnum_1 = require("../types/RoleEnum");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!req.body || !req.body.password || !req.body.email) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "Email already existing!" });
        }
        const passwordHash = await (0, bcrypt_1.hash)(req.body.password, 10);
        const registerData = {
            ...req.body,
            password: passwordHash,
            joined: new Date().toISOString(),
            status: req.body.role === RoleEnum_1.RoleEnum.USER ? RoleEnum_1.StatusEnum.PENDING : RoleEnum_1.StatusEnum.ACTIVE,
        };
        await usersCollection.insertOne(registerData);
        return res.status(200).send({ message: `${registerData.name.toUpperCase()} successfully created` });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const db = await (0, db_1.connectToDatabase)();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const passwordMatch = await (0, bcrypt_1.compare)(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: 'Wrong credentials' });
        }
        if (user.status === RoleEnum_1.StatusEnum.DECLINED) {
            return res.status(403).send({ message: 'Account has been blocked' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_TOKEN);
        return res.status(200).send({ token, userId: user._id, userName: user.name, userStatus: user.status, avatar: user?.avatar });
    }
    catch (err) {
        console.error(err);
        return res.send({ message: "Something went wrong." });
    }
};
exports.loginUser = loginUser;

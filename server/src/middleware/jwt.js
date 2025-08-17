"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.headers);
    if (token == null)
        return res.sendStatus(403).send({ message: 'Invalid token' });
    jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN, (err) => {
        if (err)
            return res.status(403).send({ message: 'Invalid token' });
        next();
    });
};
exports.authenticateToken = authenticateToken;

import { compare, hash } from "bcrypt";
import express from "express"
import { RoleEnum, StatusEnum } from "../types/RoleEnum";
import { Collection } from "mongodb";
import { UserDbType } from "../types";
import { connectToDatabase } from "../db/db";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register-user', async (req, res) => {

  if (!req.body || !req.body.password || !req.body.role) {
    return res.status(400).send('Missing required fields')
  }
 
  const passwordHash = await hash(req.body.password, 10)
  const registerData = {
    ...req.body,
    password: passwordHash,
    joined: new Date().toISOString(),
    status: req.body.role === RoleEnum.USER ? StatusEnum.PENDING : StatusEnum.ACTIVE,
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users')
    const user = await usersCollection.findOne({ email: req.body.email })
    if(user && user.email === req.body.email) {
      return res.status(409).send({msg:"Email already existing!"})
    }
    await usersCollection.insertOne(registerData)
    return res.status(200).send('User created')
  } catch (err) {
    return res.status(500).send('Internal server error')
  }
});

router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>('users');
    const user = await usersCollection.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const passwordMatch = await compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Wrong credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN!)
    if (user.status === StatusEnum.DECLINED) {
      return res.status(403).send({ message: 'Account has been blocked' })
    }
    return res.status(200).send({ token, userId: user._id, userName: user.name, userStatus: user.status });
  } catch (err) {
    return res.status(404).send(err)
  }
});

module.exports = router;
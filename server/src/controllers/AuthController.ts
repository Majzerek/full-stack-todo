import { Collection } from "mongodb";
import { Request, Response } from "express";
import { compare, hash } from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserDbType } from "../types";
import { RoleEnum, StatusEnum } from "../types/RoleEnum";




export class AuthController  {
  constructor(private usersCollection: Collection<UserDbType>) { }
   
  async registerUser(req: Request, res: Response) {
    const passwordHash = await hash(req.body.password, 10)
    const registerData = {
      ...req.body,
      password: passwordHash,
      joined: new Date().toISOString(),
      status: req.body.role === RoleEnum.USER ? StatusEnum.ACTIVE : StatusEnum.PENDING
    }
    try {
      await this.usersCollection.insertOne(registerData)
      return res.status(200).send({ message: 'User created' })
    } catch (err) {
      return res.status(504).send(err)
    }
  };


  async setLoginStatus(req: Request, res: Response) {
    try {
      const user = await this.usersCollection.findOne({ email: req.body.email })
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

  };
}
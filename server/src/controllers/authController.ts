import { compare, hash } from "bcrypt";
import { RoleEnum, StatusEnum } from "../types/RoleEnum";
import { UserDbType } from "../types";
import { connectToDatabase } from "../db/db";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!req.body || !req.body.password || !req.body.email) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection<UserDbType>("users");
    const user = await usersCollection.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).send({ message: "Email already existing!" });
    }

    const passwordHash = await hash(req.body.password, 10);
    const registerData = {
      ...req.body,
      password: passwordHash,
      joined: new Date().toISOString(),
      status:
        req.body.role === RoleEnum.USER
          ? StatusEnum.PENDING
          : StatusEnum.ACTIVE,
    };

    await usersCollection.insertOne(registerData);
    return res
      .status(200)
      .send({
        message: `${registerData.name.toUpperCase()} successfully created`,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();

    const usersCollection = db.collection<UserDbType>("users");
    const user = await usersCollection.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordMatch = await compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Wrong credentials" });
    }

    if (user.status === StatusEnum.DECLINED) {
      return res.status(403).send({ message: "Account has been blocked" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN!);

    return res
      .status(200)
      .send({
        token,
        userId: user._id,
        userName: user.name,
        userStatus: user.status,
        avatar: user?.avatar,
      });
  } catch (err) {
    console.error(err);
    return res.send({ message: "Something went wrong." });
  }
};

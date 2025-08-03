import { ObjectId } from "mongodb";

export type UserDbType = {
    _id: ObjectId,
    name: string,
    surname: string,
    email: string,
    phoneNumber?: string,
    role: string,
    status: string
    age?:string,
    joined:string,
    password: string
}

import { ObjectId } from "mongodb";

export type UserDbType = {
    _id: ObjectId;
    name: string;
    surname: string;
    email: string;
    phoneNumber?: string;
    role: string;
    status: string
    joined:string;
    password: string;
    personalAddress?: {
        street: string;
        postCode: string;
        town: string;
        buildingNumber: string;
        apartmentNumber?: string;
    };
}

export type UsersStatisticType = Omit<UserDbType, '_id'>
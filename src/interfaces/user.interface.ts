import { Schema, Document } from "mongoose";

export interface UserBase {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    role: string;
    articles?: Schema.Types.ObjectId[]; 
}

export interface OptionalUserBase extends Partial<UserBase>{}
export interface UserDocument extends Document, UserBase{}
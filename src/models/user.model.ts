import { model, Schema } from "mongoose";
import { UserDocument } from "../interfaces/user.interface";

const userSchema = new Schema <UserDocument>({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true
    },
    articles: [{
        type:Schema.Types.ObjectId,
        ref:'Article'
    }],
    
})

export default model<UserDocument>('User', userSchema)
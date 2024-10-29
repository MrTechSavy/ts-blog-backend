import mongoose, {Mongoose} from "mongoose";
import { exit } from "process";


export const connect = async ()  => {
    try{
        const connection :  Mongoose = await mongoose.connect('mongodb+srv://nicolasmm:test1234@myblog.gawcj.mongodb.net/?retryWrites=true&w=majority&appName=myBlog')
        if(connection){
            console.log("Successffully connected to the database")
        }
    }catch(err){
        if(err){
            console.log(err)
            exit(-1)
        }

    }
} 
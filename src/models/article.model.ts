import { CallbackWithoutResultAndOptionalError, Schema, model } from "mongoose";
import { ArticleDocument } from "../interfaces/article.interface";
import userModel from "./user.model";

const articleSchema = new Schema<ArticleDocument>({
    title: {
        type:String,
        required:true
    },
    texte: {
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    date:{
        type:Date,
        required:true
    }
})

articleSchema.pre<ArticleDocument>('save', async function (next: CallbackWithoutResultAndOptionalError) {

    if (this.isNew) {
        userModel.
        updateOne({ _id: this.user }, { $push: { articles: this._id }})
        .then(() => {
             next(); 
        })
        .catch((err : Error)=> {
            return next(err); 
        })
    }
})

articleSchema.pre<ArticleDocument>('findOneAndDelete', function (next: CallbackWithoutResultAndOptionalError) {
    const articleId = this._id;
    const userId = this.user; // ID de l'utilisateur associé

    userModel
        .updateOne({ _id: userId }, { $pull: { articles: articleId } })
        .then(() => {
            next();
        })
        .catch((err: Error) => {
            return next(err);
        });
});

export default model<ArticleDocument>('Article', articleSchema)
import { Schema, Document} from "mongoose";

export interface ArticleBase{
    title: string;
    texte: string;
    user: Schema.Types.ObjectId;
    date: Date;
}

export interface OptionalArticleBase extends Partial<ArticleBase>{}
export interface ArticleDocument extends Document, ArticleBase{}
import { Request, Response } from "express"
import articleModel from "../models/article.model"
import { ArticleBase, ArticleDocument, OptionalArticleBase } from "../interfaces/article.interface"
import { DeleteResult } from "mongoose"


export const createArticle = (req:Request, res: Response) => {
    const article: ArticleBase = {
        title: req.body.title,
        texte:req.body.texte,
        user: req.body.user,
        date: new Date(req.body.date)
    }
    const newArticle : ArticleDocument = new articleModel(article)
    newArticle
    .save()
    .then((data : ArticleDocument) => {
        res.send({
            success: true,
            data: data
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

export const getArticleById = async (req: Request, res: Response) : Promise<void> => {
    articleModel
    .findById(req.params.id)
    .populate({
        path: 'user',
        select: 'firstname lastname _id'
    })
    .select('-__v')
    .then((article : ArticleDocument | null) => {
        res.send({
            sucess:true,
            data:article
        })
    }).catch((err: Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

export const getAllArticles = async (req:Request, res: Response): Promise<void> => {
    articleModel
    .find()
    .populate({
        path:'user',
        select:'_id firstname lastname'
    })
    .then((articles : ArticleDocument[]) => {
        res.send({
            sucess: true,
            data:articles
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:false,
            message:err.message
        })
    })
}

export const updateArticle = async (req: Request, res: Response) : Promise<void> => {
    const body : OptionalArticleBase = req.body
    
    articleModel
    .findByIdAndUpdate(req.params.id, body, {new:true})
    .select('-__v')
    .then((updatedArticle: ArticleDocument | null) => {
        res.send({
            success:true, 
            data:updatedArticle
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:true,
            message:err.message
        })
    })
}

export const deleteArticleById = async (req: Request, res: Response) : Promise<void> => {
    articleModel
    .findOneAndDelete({_id:req.params.id})
    .then((deletedArticle: ArticleDocument | null) => {
        res.send({
            success:true,
            data: deletedArticle 
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:true,
            message: err.message
        })
    })
}

export const deleteAllArticles = async(_:any, res: Response) :Promise<void> => {
    articleModel
    .deleteMany({})
    .then((result:DeleteResult) => {
        res.send({
            success:true,
            data:result
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:false,
            message:err.message
        })
    })
}

import { Router } from "express";
import { createArticle, deleteAllArticles, deleteArticleById, getAllArticles, getArticleById, updateArticle } from "../controllers/article.controller";

const router : Router = Router()
router.get('/article/:id', getArticleById)
router.get('/articles', getAllArticles)

router.post('/article', createArticle)

router.put('/article/:id', updateArticle)

router.delete('/article/:id', deleteArticleById)
router.delete('/articles', deleteAllArticles)
export default router
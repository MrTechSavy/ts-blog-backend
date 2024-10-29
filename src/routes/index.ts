import express, {Router} from "express";
import userRouter from './user.route'
import articleRouter from './article.route'
const router : Router = express.Router()

router.use(userRouter)
router.use(articleRouter)

export default router

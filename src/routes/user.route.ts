import express, {Router} from 'express'
import {createUser, getUsers, getUser, login, updateUserById, deleteUserById} from '../controllers/user.controller'

const router: Router = express.Router()

router.post('/user', createUser)
router.post('/user/login', login)

router.get('/users', getUsers)
router.get('/user/:id', getUser)

router.put('/user/:id', updateUserById)

router.delete('/user/:id', deleteUserById)

export default router
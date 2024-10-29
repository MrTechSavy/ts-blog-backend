import {Request, Response} from 'express'
import userModel from '../models/user.model';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt'
import { UserBase, UserDocument, OptionalUserBase } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken'
import jwtConfig from '../configs/token.config';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const hashedPassword  = bcrypt.hashSync(req.body.password, 8)
    const newUser : UserBase = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
        articles: [],
    };
    const user = new userModel(newUser);
    user
    .save()
    .then((user: Document) =>{
        res.send({
            success:true,
            data:user
        })
    }).catch((err : Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

export const getUsers = async (req: Request, res: Response):  Promise<void> => {
    userModel
    .find()
    .then((users: UserDocument[]) => {
        res.send({
            succes:true,
            data:users
        })
    }).catch((err : Error) => {
        res.status(500).send({
            success:false,
            message:err.message
        })
    })
}

export const getUser = async(req: Request, res: Response): Promise<void> => {
    userModel
    .findById(req.params.id)
    .then((user: UserDocument | null) => {
        res.send({
            success: true,
            data: user
        })
    }).catch((err: Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

export const login = async (req: Request, res: Response): Promise<void> => {
    userModel
        .findOne({ email: req.body.email })
        .then((user: UserDocument | null) => { 
            if (!user) {
                res.status(404).send({
                    success: false,
                    message: "User not found",
                });
                return;
            }
            
            
            bcrypt.compare(req.body.password, user.password)
            .then((isEqual: boolean) => {
                if(isEqual){
                    const token = jwt.sign({
                        id: user._id,
                        fullname: `${user.firstname} ${user.lastname}`,
                        role: user.role,
                        firstname: user.firstname,
                        lastname: user.lastname

                    }, jwtConfig.secret,{
                        expiresIn: '2h'
                    }
                )
                    res.send({
                        success: true,
                        data: token
                    })
                }
            })
            .catch((err: Error) => {
                res.send({
                    success:false,
                    message: err.message
                })
            })
        })
        .catch((err: Error) => {
            res.status(500).send({
                success: false,
                message: err.message,
            });
        });
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const body : OptionalUserBase = req.body

    userModel
    .findByIdAndUpdate(req.params.id, body, {new:true})
    .select('-password -_id -articles -__v')
    .then((updatedUser : UserDocument | null)=>  {
        res.send({
            success: true,
            data: updatedUser
        })
    }).catch((err: Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

export const deleteUserById = async (req: Request, res: Response) : Promise<void> => {
    userModel
    .findByIdAndDelete(req.params.id)
    .then((result : UserDocument | null) => {
        res.send({
            success: true,
            data:result
        })
    }).catch((err:Error) => {
        res.status(500).send({
            success:false,
            message: err.message
        })
    })
}

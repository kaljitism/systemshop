import bcrypt from "bcryptjs";
import express from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import { generateToken } from "../utils";

export const userRouter = express.Router()

// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler( async ( request, response ) => {
    const user = await UserModel.findOne( { email: request.body!.email } )
    if ( user ) {
      if ( bcrypt.compareSync( request.body.password, user.password ) ) {
        response.json( {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken( user ),
        } )
        return
      }
    }
    response.status( 401 ).json( { message: 'Invalid email or password' } )
  } )
)
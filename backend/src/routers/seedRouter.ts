import express from "express";
import asyncHandler from "express-async-handler";
import { productList, sampleUsers } from "../data";
import { ProductModel } from "../models/productModel";
import { UserModel } from "../models/userModel";

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler( async ( request, response ) => {
    await ProductModel.deleteMany( {} )
    const createdProducts = await ProductModel.insertMany( productList )

    await UserModel.deleteMany( {} )
    const createdUsers = await UserModel.insertMany( sampleUsers )

    response.json( { createdProducts, createdUsers } )
  }, )
)
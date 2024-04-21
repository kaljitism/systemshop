import express from "express";
import asyncHandler from "express-async-handler";
import { productList } from "../data";
import { ProductModel } from "../models/productModel";

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler( async ( request, response ) => {
    await ProductModel.deleteMany( {} )
    const createdProducts = await ProductModel.insertMany( productList )
    response.json( { createdProducts } )
  }, )
)
import express from "express";
import asyncHandler from 'express-async-handler'

import {ProductModel} from "../models/productModel";


export const productRouter = express.Router()

// /api/products
productRouter.get(
  '/',
  asyncHandler(async (request, response) => {
    const products = await ProductModel.find()
    response.json(products)
  })
)

// /api/slug/:slug
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (request, response) => {
    const product = await ProductModel.findOne({slug: request.params.slug})
    if (product) {
      response.json(product)
    } else {
      response.status(404).json({message: 'Product Not Found'})
    }
  })
)

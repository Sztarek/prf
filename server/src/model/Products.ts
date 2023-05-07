import { ObjectId } from "mongodb"
import mongoose from "mongoose"


export const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  desc: String,
  type: String,
  _id: ObjectId,
})

export interface IProduct extends mongoose.Document {
  name: string
  price: string
  desc: string
  type: string
  _id: ObjectId
}


ProductSchema.pre("updateOne", async function preSaveCallback(next) {
  console.log('pre Update')
  next()
})

ProductSchema.pre("insertMany", function preSaveCallback(next) {
  console.log('pre insert')
  next()
})

export const Products: mongoose.Model<IProduct> = mongoose.model<IProduct>(
  "products",
  ProductSchema,
)

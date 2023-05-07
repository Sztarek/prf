import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
  name: String,
  isAdmin: Boolean,
})

export interface IUser extends mongoose.Document {
  email: string
  password: string
  name: string
  isAdmin: boolean
}

const SALT_FACTOR = 10

UserSchema.pre("save", function preSaveCallback(next) {
  const _this = this as any

  bcrypt.genSalt(SALT_FACTOR, function genSaltCallback(error, salt) {
    if (error) {
      return next(error)
    }

    bcrypt.hash(_this.password, salt, function hashCallback(error2, hash) {
      if (error2) {
        return next(error2)
      }
      _this.password = hash
      next()
    })
  })
})

UserSchema.methods.findById = async (id: string, cb: any) => {
  return User.findOne<IUser>({ _id: id }).exec()
}


export const User: mongoose.Model<IUser> = mongoose.model<IUser>(
  "users",
  UserSchema,
)


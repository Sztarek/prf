import express from "express"
import passport from "passport"
import passportLocal from "passport-local"
import expressSession from "express-session"
import { IUser, User } from "./model/User"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"
import * as dotenv from "dotenv"
import { Products } from "./model/Products"
import { bootstrap } from "./bootstrap"

dotenv.config()

const app = express()
const port = process.env.PORT
const dbUrl = process.env.ATLAS_URI
const dbName = process.env.DB_NAME
const shouldBootstrap = process.env.SHOULD_BOOTSTRAP

if (shouldBootstrap) {
  bootstrap()
}

const comparePassword = (pw1: string, pw2: string) => {
  return bcrypt.compare(pw1, pw2)
}

passport.serializeUser(function (user: any, done) {
  done(null, user._id)
})

passport.deserializeUser((id: any, done) => {
  User.findOne({ _id: new ObjectId(id) }, (err: any, doc: any) => {
    done(null, doc) // this is the fix
  })
})

app.use(
  expressSession({
    secret: "testsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
)
app.use(passport.initialize())
app.use(passport.session())

mongoose
  .connect(dbUrl, { dbName: dbName })
  .then((_) => {
    console.log("Successfully connected to MongoDB")
  })
  .catch((error) => {
    console.log(error)
  })

const whiteList = ["*"]
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whiteList.indexOf(origin) !== -1 || whiteList.includes("*")) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

passport.use(
  "local",
  new passportLocal.Strategy(async (email, password, done) => {
    const user = await User.findOne<IUser>({ email: email }).exec()
    if (!user) {
      return done(null, undefined)
    }
    if (await comparePassword(password, user.password)) {
      return done(null, user)
    }
  })
)

app.use(
  "/api/users",
  require("./routes/userRoutes")(passport, express.Router())
)
app.use(
  "/api/products",
  require("./routes/productRoutes")(passport, express.Router())
)

app.listen(port, () => {
  console.log("App is listening on port 3001...")
})

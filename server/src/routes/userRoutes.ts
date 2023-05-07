import { NextFunction, Request, Response } from "express"
import { User } from "../model/User"
import { ObjectId } from "mongodb"
import { compareSync } from "bcrypt"

const decodeBody = (body: any) => {
  return JSON.parse(Object.keys(body)[0])
}

module.exports = (passport: any, router: any) => {

  router.get("/admin", async (req: Request, res: Response) => {
    return res.send(await User.find().exec())
  })

  router.post("/admin", async (req: Request, res: Response) => {
    if (!req.cookies.isAdmin) return res.status(403).send("Forbidden")

    const { name, price, desc, type } = decodeBody(req.body)
    res.status(200).send(await User.insertMany({ name, price, desc, type }))
  })

  router.get(
    "/admin/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      res.status(200).send(await User.findOne({_id: new ObjectId(id)}).exec())
    }
  )

  router.put(
    "/admin/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      const { name, price, desc, type } = decodeBody(req.body)
      res.status(200).send(await User.updateOne({_id: new ObjectId(id)}, {$set: {name, price, desc, type}}).exec())
    }
  )

  router.delete(
    "/admin/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      res.status(200).send(await User.deleteOne({_id: new ObjectId(id)}).exec())
    }
  )

  router.get("/getcookie", (req: any, res:any) => {
    res.send(req.cookies)
  })

  router.post("/login", (req: any, res: any, next: NextFunction) => {
    const { email, password } = decodeBody(req.body)
    req.body.username = email
    req.body.password = password
    console.log('asd')
    passport.authenticate("local", (err: any, user: any) => {
      console.log('asd')
      if (err) {
        console.log('asd')
        console.log(err)
        res.status(500).send("Internal server error.")
      } else {
        console.log('asd')
        req.login(user, (error: any) => {
          console.log('asd')
          if (error) {
            console.log(error)
            res.status(500).send("Incorrect username or password.")
          } else {
            console.log("logged in user")
            res.cookie("isLoggedIn", true)
            res.cookie("isAdmin", user.isAdmin ?? false)
            res.status(200).send(user)
          }
        })
      }
    })(req, res, next)
  })

  router.post("/register", (req: any, res: Response, next: NextFunction) => {
    const { email, password, name, isAdmin = false } = decodeBody(req.body)
    const user = new User({ email, password, name, isAdmin })
    user
      .save()
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
  })

  router.post("/logout", (req: any, res: Response, next: NextFunction) => {
    res.cookie("isLoggedIn", false)
    res.cookie("isAdmin", false)
    res.status(200).send('Good')
  })

  return router
}

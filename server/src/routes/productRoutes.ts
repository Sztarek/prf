import { NextFunction, Request, Response } from "express"
import { User } from "../model/User"
import { Products } from "../model/Products"
import { ObjectId } from "mongodb"

const decodeBody = (body: any) => {
  return JSON.parse(Object.keys(body)[0])
}

module.exports = (passport: any, router: any) => {
  router.get("/", async (req: Request, res: Response) => {
    return res.send(await Products.find().exec())
  })

  router.post("/", async (req: Request, res: Response) => {
    if (!req.cookies.isAdmin) return res.status(403).send("Forbidden")

    const { name, price, desc, type } = decodeBody(req.body)
    res.status(200).send(await Products.insertMany({ name, price, desc, type }))
  })

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      res.status(200).send(await Products.findOne({_id: new ObjectId(id)}).exec())
    }
  )

  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      const { name, price, desc, type } = decodeBody(req.body)
      console.log('updating')
      res.status(200).send(await Products.updateOne({_id: new ObjectId(id)}, {$set: {name, price, desc, type}}).exec())
    }
  )

  router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      console.log('Delete: ' + id)
      res.status(200).send(await Products.deleteOne({_id: new ObjectId(id)}).exec())
    }
  )

  return router
}

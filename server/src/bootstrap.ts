import { Products } from "./model/Products"
import { User } from "./model/User"

export const bootstrap = () => {
  Products.insertMany([
    {
      name: "A book",
      price: "4000",
      desc: "This is a very good book, written by Test Guy",
      type: "book",
    },
    {
      name: "Some clothes",
      price: "14000",
      desc: "These are some very good looking and comfortable clothes",
      type: "clothes",
    },
    {
      name: "Another book",
      price: "3000",
      desc: "This is also a book, but this time, it's written buy Test Elek",
      type: "book",
    },
    {
      name: "A coffee machine",
      price: "44000",
      desc: "This a machine, that makes coffee",
      type: "electronics",
    },
    {
      name: "A gyros",
      price: "3000",
      desc: "Just a well seasoned gyros",
      type: "food",
    },
  ])

  new User({
    email: "admin@admin.com",
    password: "adminadmin",
    name: "An Administrator",
    isAdmin: true,
  }).save()

  new User({
    email: "test@test.com",
    password: "testtesttest",
    name: "Not An Administrator",
    isAdmin: false,
  }).save()
}

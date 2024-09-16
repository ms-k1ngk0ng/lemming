const { Prisma } = require('@prisma/client')

const users = [
  {
    name: "Tim Apple",
    email: "tim@apple.com",
    password: "timapple1"
  }
]

module.exports = {
  users
}
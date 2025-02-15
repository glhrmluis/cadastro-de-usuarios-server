import express from "express"
import cors from "cors"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

app.get("/usuarios/:id", async (req, res)=>{

    const users = await prisma.user.findMany()

    res.status(201).json(users)
})

app.post("/usuarios", async (req, res)=>{

    const users = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(users)
})

app.put("/usuarios/:id", async (req, res)=>{

    const users = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(200).json(users)
})

app.delete("/usuarios/:id", async (req, res)=>{

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(users)
})


app.listen(3000)
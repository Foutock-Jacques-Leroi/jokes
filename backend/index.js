import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import ALL from 'dns'
import FriendModel from './Model/employeeModel.js'
dotenv.config()





const app = express()

const PORT = process.env.PORT







mongoose.connect(`${process.env.MONGODB_ATLAS_CONNECTION}`)

app.use(express.json())

app.use(cors({
    origin: ALL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))

app.get('/', (req, res) => {
    FriendModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
})



app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    FriendModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => console.log(err))

})

app.post('/add', (req, res) => {

    FriendModel.create(req.body)
        .then(user => { res.json("create")})
        .catch(err => res.json(err))

})

app.patch('/edit/:id', (req, res) => {
    const id = req.params.id

    FriendModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        salary: req.body.salary,
        address: req.body.address,
        status: req.body.status,
        email: req.body.email
    })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id

    FriendModel.findByIdAndDelete({ _id: id })
        .then(user => res.json("deleted"))
        .catch(err => res.json(err))
})



app.listen(PORT, () => {
    console.log('backend runninig ...')
})

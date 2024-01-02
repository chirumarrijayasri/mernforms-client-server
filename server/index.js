import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


import { readUser, createUser,readPerticularUser, updateUser, updateSmallChangesUser, deleteUser}  from '../server/controllers/functions.js'


const app = express()
const db= "mongodb://localhost:27017/form-database"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected"))
    .catch(err => console.log(`Error: ${err}`))
    

app.use(cors())
app.use(express.json())

app.get('/users', readUser)
app.post('/users', createUser)
app.put('/users/:id',updateUser)
app.get('/users/:id', readPerticularUser)
app.patch('/users/:id', updateSmallChangesUser)
app.delete('/users/:id', deleteUser)    
app.listen(8989, console.log("server is running on port 8989"))




import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose'


import { readUser, createUser,readPerticularUser, updateUser, updateSmallChangesUser, deleteUser}  from '../server/controllers/functions.js'


const app = express()
dotenv.config()
const db= "mongodb://localhost:27017/form-database"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected"))
    .catch(err => console.log(`Error: ${err}`))
    


app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.get('/users', readUser)
app.post('/users', createUser)
app.put('/users/:id',updateUser)
app.get('/users/:id', readPerticularUser)
app.patch('/users/:id', updateSmallChangesUser)
app.delete('/users/:id', deleteUser)    

const port = process.env.PORT || 8989;

app.listen(port, () => {
    mongoose.connect(db)
        .then(() => console.log(`Server is running on port 8989 and connected to the database`))
        .catch((err) => console.log(err));
});



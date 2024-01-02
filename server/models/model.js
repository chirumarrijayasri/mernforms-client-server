import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: "true"
    },
    lastName : {
        type : String,
        required: "true"
    },
    gender : {
        type : String,
        required: "true"
    },
    age : {
        type : Number,
        required: "true"
    },
    profile : {
        type : String,
        required: "true"
    },
    bio : {
        type : String,
        required: "true"
    },
    interests : {
        type : [],
        required: "true"
    },
    

})

var users = mongoose.model("users", formSchema)
export default users;
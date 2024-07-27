import mongoose, { mongo } from "mongoose";


const tokenSchema = mongoose.Schema({

    token:{
        type: String,
        required: true
    }
})


const  token = mongoose.model('token',tokenSchema);
export default token;
import mongoose, { model } from "mongoose";


const userSchema =mongoose.Schema({


    name:{
        type: String,
        required:true
    },
    username:{
        type: String,
        unique: true,
        required:true
    },

    password:{
        type: String,
        required:true

    }
})


const user =mongoose.model('user',userSchema);

export default user;
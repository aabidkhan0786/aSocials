import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required: true,
        unique:true,
        min:3,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilepicture:{
        type:String,
        default:""
    },
    coverpicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    desc:{
        type:String,
        max:25
    },
    city:{
        type:String,
    }
},{timestamps:true})

const Users = mongoose.model("Users", userSchema)
export default Users;
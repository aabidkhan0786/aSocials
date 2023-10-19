import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        // required: true
    },
    username:{
        type:String
    },
    desc:{
        type:String,
        max:500,
        required:true     
    },
    img:{
        type:String

    },
    location:{
        type:String,
        default:"India"
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const Posts = mongoose.model("Posts",postSchema)

export default Posts
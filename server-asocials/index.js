import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRouter from "./Routes/Auth.js"
import userRouter from "./Routes/Users.js"
import postRouter from "./Routes/Posts.js"
import cors from "cors"
import bodyParser from "body-parser";

const app = express();
dotenv.config()
const port = process.env.PORT || 5000

//middlewares
app.use(cors())
// app.use(express.json())
// app.use(express.json({limit: '500mb'}));
// app.use(express.urlencoded({limit: '500mb', extended: true, parameterLimit:10000}));
app.use(express.json({ limit: '10mb' })); // Change '10mb' to your desired limit

app.use("/aak/auth",authRouter)
app.use("/aak/user",userRouter)
app.use("/aak/posts",postRouter)

// connect db and server
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology:true} )
.then(()=> app.listen(port,()=>console.log(`server running at ${port}`)))
.catch((error) => console.log(error));


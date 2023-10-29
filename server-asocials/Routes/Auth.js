import express from "express";
import Users from "../Models/Users.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"


const router = express.Router()

//register new user
router.post("/register", async (req,res)=>{
    try {
        const {email,username} = req.body
        const existingUser = await Users.findOne({email})
        const userName = await Users.findOne({username})
        console.log(existingUser);
        if(existingUser){
            res.status(403).json({msg:"User already exists!"});
        }else{
            const newUser = new Users({
                username:req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password,process.env.HASH_KEY).toString()
            })
            const user = await newUser.save()
            console.log(user);
            const accesstoken = jwt.sign(
                {
                    email: user.email,
                    id:user._id
                  },
                  process.env.JWT_KEY,
                  { expiresIn: "3d" }
                  );
            res.status(201).json({user,accesstoken});
        }
    } catch (error) {
        res.status(500).json({msg: error.message });
    }
})

// login user
router.post("/login", async (req,res)=>{
    try {
        const user = await Users.findOne({email:req.body.email});
        if(!user){
            res.status(404).json({msg:"User not found!"})
        }else{
            const hashedpass = CryptoJS.AES.decrypt(
                user.password,
                process.env.HASH_KEY
              );
              const password = hashedpass.toString(CryptoJS.enc.Utf8);
              if( password !== req.body.password){
                res.status(401).json({msg:"Wrong Credentials!!"});
              }else{
                const accesstoken = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                      },
                      process.env.JWT_KEY,
                      { expiresIn: "10d" }
                      );
                      console.log(accesstoken);
                  res.status(200).json({user,accesstoken});
                // res.status(200).json({user});
              }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message });
    }
})
export default router;
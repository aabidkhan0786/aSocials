import express from 'express';
import Posts from '../Models/Posts.js';
import Users from '../Models/Users.js';
import Auth from '../Middlewares/Auth.js';

const router = express.Router();

//create a post
router.post("/",Auth, async (req,res)=>{
    console.log(req.body.desc);
    const newPost = new Posts(req.body)
    console.log(newPost);
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(201).json(error)
    }
})

//update a post
router.put("/:id",Auth, async (req,res)=>{
    try {
        const post = await Posts.findOne(req.params.id)
        if(post.userId === req.body.userId){
            await Posts.findOne({$set:req.body})
            res.status(201).json("Post updated!")
        }else{
            res.status(404).json("Post doesn't exists!")
        }     
    } catch (error) {
        res.status(500).json(error)
    }
})

//like dislike a post
router.put("/:id/like",Auth, async (req,res)=>{
    try {
        const post = await Posts.findOne(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:req.body.userId})
            res.status(201).json("Post has been liked!")
        }else{
            await post.updateOne({$pull:req.body.userId})
            res.status(201).json("Post has been disliked!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get a post
router.get("/:id",async (req,res)=>{
    try {
        const post = await Posts.findById(req.params.id)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get my timeline
router.get("/timeline", async (req,res)=>{
    try {
        const currentUser = await Users.findById(req.body.userId)
        const userPosts = await Posts.findById(currentUser.userId)
        const friendPosts = await Promise.all(
            currentUser.followings.map(frndId=>{
                return Posts.find({userId:frndId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }

})

//get all posts
router.get("/",async (req,res)=>{
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;
import express from "express";
import Posts from "../Models/Posts.js";
import Users from "../Models/Users.js";
import Auth from "../Middlewares/Auth.js";

const router = express.Router();

//create a post
router.post("/", Auth, async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
});

//update a post
router.put("/:id", Auth, async (req, res) => {
  try {
    const post = await Posts.findOne({ _id: req.params.id });
    if (post.userId === req.userId) {
      const updatedPost = await Posts.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      console.log({ updatedPost });
      res.status(201).json(updatedPost);
    } else {
      res.status(404).json({msg:"Post doesn't exists!"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: error.message });
  }
});

//delete a post
router.delete("/:id", Auth, async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  try {
    await post.deleteOne();
    res.status(201).json(req.params.id);
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
});

//like dislike a post
router.put("/:id/like", Auth, async (req, res) => {
  try {
    const post = await Posts.findOne({ _id: req.params.id });
    console.log(post);
    if (!post.likes.includes(req.userId)) {
      const likedpost = await post.updateOne({ $push: { likes: req.userId } });
      const updatedPost = await Posts.findById(req.params.id);
      res.status(200).json(updatedPost);
    } else {
      const unliked = await post.updateOne({ $pull: { likes: req.userId } });
      const updatedPost = await Posts.findById(req.params.id);
      res.status(201).json(updatedPost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: error.message });
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
});

//get my timeline
router.get("/timeline/:id", async (req, res) => {
  try {
    const currentUser = await Users.findById(req.params.id);
    const userPosts = await Posts.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((frndId) => {
        return Posts.find({ userId: frndId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: error.message });
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
});

export default router;

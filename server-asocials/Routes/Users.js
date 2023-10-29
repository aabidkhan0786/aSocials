import express from "express";
import CryptoJS from "crypto-js";
import Users from "../Models/Users.js";
import Auth from "../Middlewares/Auth.js";
const router = express.Router();

// get all user
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user
router.put("/:id",Auth, async (req, res) => {
  if (req.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.HASH_KEY
      ).toString();
    }
    try {
      const updated_user = await Users.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(201).json(updated_user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    return res.status(500).json("User can't be updated!");
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await Users.deleteOne({ _id: req.params.id });
      res.status(201).json("Account deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(500).json("User can't be deleted!");
  }
});

//get a user
router.get("/find", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
  try {
    const user = userId ? await Users.findById(req.query.userId) : await Users.findOne({ username: username }) ;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("unable to fetch the user!");
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      var followerDetails = await Users.findById(req.params.id);
      var currentUser = await Users.findById(req.body.userId);
      if (!followerDetails.followers.includes(req.body.userId)) {
         await followerDetails.updateOne({ $push: { followers: req.body.userId } });
         await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("you are following "+ followerDetails.username);
      } else {
        res.status(403).json("You are already a follower");
      }
    } catch (error) {
      console.log({error});
      res.status(403).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself!");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      const currentUser = await Users.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json(`you have unfollowed ${user.username}`);
      } else {
        res.status(403).json("You are not following the user!");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(403).json("You can't unfollow yourself!");
  }
});

export default router;

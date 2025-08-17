const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
} = require("../controllers/PostController");
const { authenticateRequest } = require("../middleware/authMiddleware");

const router = express();

//middleware -> this will tell if the user is an auth user or not
router.use(authenticateRequest);

router.post("/create-post", createPost);
router.get("/all-posts", getAllPosts);
router.get("/:id", getSinglePost);
router.delete("/:id", deletePost);

module.exports = router;

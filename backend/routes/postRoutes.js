const express = require("express");
const {
    testRoute,
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likePost,
    unlikePost,
    addCommentToPost,
    deletePostComment
} = require("../controllers/postController");
const { userPostValidationRules, validate } = require("../utils/validator")
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/test").get(testRoute);
router.route("/").post(protect, userPostValidationRules(), validate, createPost).get(getAllPosts)
router.route("/:id").get(getPostById).delete(protect, deletePostById)
router.route("/like/:id").put(protect, likePost)
router.route("/unlike/:id").put(protect, unlikePost)
router.route("/comment/:id").post(protect, userPostValidationRules(), validate, addCommentToPost)
router.route("/comment/:id/:comment_id").delete(protect, deletePostComment)

module.exports = router;
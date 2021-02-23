const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

// @route       GET api/posts/test
// @dec         Test Posts Route
// @access      Public
const testRoute = asyncHandler(async (req, res) => {
    res.json({
        msg: "Posts works"
    })
})

// @route       POST api/posts
// @dec         Create a post
// @access      Private
const createPost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = await Post.create({
        text: req.body.text,
        image: req.body.image !== null || req.body.image !== '' ? req.body.image : null,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    });

    const post = await newPost.save()

    res.json(post)
})

// @route       GET api/posts
// @dec         Get all posts
// @access      Public
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ date: -1 })

    res.json(posts)
})

// @route       GET api/posts
// @dec         Get followers posts
// @access      Public
const getFollowersPosts = asyncHandler(async (req, res) => {
    const customArray = []

    req.user.following.forEach(following => {
        customArray.push(following.user.toString())
    })
    const followersPosts = await Post.find({ user: { $in: customArray } }).sort({ date: -1 })

    res.json(followersPosts)
})

// @route       GET api/posts/:id
// @dec         Get a post by ID
// @access      Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.json(post)
})

// @route       DELETE api/posts/:id
// @dec         Delete a post by ID
// @access      Private
const deletePostById = asyncHandler(async (req, res) => {

    const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    //Check for Post owner
    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //Delete
    await post.remove();

    res.json({ msg: 'Post removed' });
})


// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private

const likePost = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        res.status(400);
        throw new Error('Post already liked');
    }

    //Add like
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
})

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private

const unlikePost = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        res.status(400);
        throw new Error('Post has not yet been liked');
    }

    // remove the like
    post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    res.json(post.likes);
})

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
const addCommentToPost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    };

    //Add to comment array
    post.comments.unshift(newComment);

    //save
    await post.save();

    res.json(post.comments);
})

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment from a post
// @access   Private
const deletePostComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    // Pull out comment
    const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
        res.status(404);
        throw new Error("Comment does not exist");
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //Filter comment
    post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
})


module.exports = {
    testRoute,
    createPost,
    getAllPosts,
    getFollowersPosts,
    getPostById,
    deletePostById,
    likePost,
    unlikePost,
    addCommentToPost,
    deletePostComment
}
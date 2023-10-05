const express = require('express');
const { getAllblogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

//routes object
const router = express.Router();

//routes
//GET || all-blogs
router.get('/all-blog', getAllblogsController);

//POST || create blog
router.post('/create-blog', createBlogController);

//PUT || update blog
router.put('/update-blog/:id', updateBlogController);

//GET || singal blog details
router.get('/get-blog/:id', getBlogByIdController);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

//GET || user blog
router.get('/user-blog/:id', userBlogController);

module.exports = router;
const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//GET ALL BLOGS
exports.getAllblogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if(!blogs) {
            res.status(200).send({
                success: false,
                message: "No Blogs Found",
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs lists",
            blogs,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Error while getting Blogs",
            error,
        });
    }
};

//Create Blog
exports.createBlogController =  async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //Validation 
        if(!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        const existingUser = await userModel.findById(user);
        //Validation
        if(!existingUser){
            return res.status(404).send({
                success: true,
                message: 'unable to find user'
            })
        }
        
        const newBlog = new blogModel({ title, description, image,user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save();
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: true,
            message: 'Error While Creating Blog',
            error,
        })
    }
};

//update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        //const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate( id, {...req.body},{ new: true } );
        return res.status(200).send({
            success: true,
            message: 'Blog Updated',
            blog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Updating Blog',
            error,
        });
    }
};

//Singal Blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const{ id } = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success: false,
                message: 'blog not found with this is',
            });
        }
        return res.status(200).send({
            success: true,
            message: ' fetched single blog',
            blog,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while getting single blog',
            error,
        });
    }
};

//Delete Blog 
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog); 
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'Blog Deleted',
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error,
        });
    }
};

//GET USER BLOG
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.session(404).send({
                success: false,
                message: "blog not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user Blog",
            userBlog,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'error in user blog',
            error,
        });
    }
}
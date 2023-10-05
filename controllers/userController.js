const userModel = require('../models/userModel');
const blogModel = require('../models/blogModel'); 
const bcrypt = require('bcrypt');

//create user register user
exports.registerController = async (req , res) => {
    try {
        const { username, email, password } = req.body
        
        //Validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please Fill all fields'
            })
        }
        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //save new user
        const user = new userModel({ username, email, password: hashedPassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'New User Created',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in register Callback",
            success:false,
            error
        })
    }
};

//get all users
exports.getAllUsers = async ( req, res ) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message:"all users data",
            users,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get all users",
            error,
        });
    }
};

//login
exports.loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: "Please Provide email or password"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success: false,
                message: "Email is not registered"
            })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "Invalid username and password"
            })
        }
        return res.status(200).send({
            success: true,
            message: "login successfully...",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in login callback",
            error 
        })
    }
};

//Delete Blog 
exports.deleteUserController = async (req, res) => {
    try {
        // Find the user by ID and populate the "blogs" field
        const user = await userModel.findById(req.params.id).populate('blogs');
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Delete the user's blogs
        for (const blog of user.blogs) {
            await blogModel.findByIdAndDelete(blog)
        }

        // Delete the user
        await userModel.deleteOne({ _id: req.params.id }); 

        return res.status(200).send({
            success: true,
            message: 'User and associated blogs deleted',
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Error while deleting user and associated blogs',
            error: error.message,
        });
    }
};

//update user
exports.updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        //const { title, description, image } = req.body;
        const user = await userModel.updateOne(
            { _id: req.params.id },
            {
              $set: req.body,
            }
          );
        return res.status(200).send({
            success: true,
            message: 'User Updated',
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Updating User',
            error,
        });
    }
};

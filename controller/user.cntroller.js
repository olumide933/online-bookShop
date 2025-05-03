const jwt =require('jsonwebtoken')
const userModel =require("../model/user.model");
const bcrypt = require('bcrypt');

const signUpUser = async(req, res) =>{
    try {
        const {username, email, password} = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await userModel.create({
            username,
            email,
            password:hashed,
        });

        res.status(201).json({
            message:" user Created",
            data: user
        });
    } catch (error) {
     res.status(400).json({
        message: "failed to sign up user",
        data : error
     });   
    }
};

const getAllUsers =async(req , res)=>{
    try {
        const allUsers = await userModel.find()
        res.status(200).json({
            messsage:"users found succesfully",
            data:allUsers
        })
    } catch (error) {
       res.status(404).json({
        message:"failed to get User",
        data:error
       }) 
    }
};

const signInUser =async(req, res)=>{
    try {
        const {email, password} =req.body
        // check the user exist in the Database
        const user = await userModel.findOne({email})
        // write a condition if the user exist or not
        if (user) {
            const checkPassword = await bcrypt.compare(password,user.password)
            // write a condition to check if the password is correct or nt
            if (checkPassword) {
                const token =jwt.sign({_id: user._id},"seCrEtKEY", {expiresIn: "1h"});
                const{ password, ...info} = user._doc

                res.status(201).json({
                    message:"Signed in successfully",
                    data :{token, ...info}
                });
            } else {
              res.status(404).json({
              message:"Password not correct",
             });   
            }
        } else {
           res.status(404).json({
            message:"User not found",
           }); 
        }
    } catch (error) {
        res.status(404).json({
            message:"Error signing in User",
            data:error
           });
    }
};

const getOneUser =async(req, res) =>{
    try {
        const oneUser = await userModel.findById(req.params.userID)
        res.status(202).json({
            message:"user gotten succesfully",
            data: oneUser
        })
    } catch (error) {
        res.status(404).json({
            message:"Error occurerd getting this user",
            data:error
           }); 
    }
};







module.exports = {signUpUser,getAllUsers, signInUser, getOneUser};
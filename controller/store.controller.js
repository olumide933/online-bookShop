const storeModel =require("../model/store.model");
const cloudinery =require("../config/cloudinary");
const userModel = require("../model/user.model");
const { default: mongoose } = require("mongoose");

const createBook = async(req, res) =>{
    try {
       const {title, author, summary} = req.body;
       const cloudImage = await cloudinery.uploader.upload(req.file.path)
       const getUser =await userModel.findById(req.params.id)
       const isbnNumberCreate =Math.floor(Math.random() * 10000); 

       const createBook = await new storeModel({
        title,
        author,
        summary,
        ISBN: `SUPERBOOK- ${isbnNumberCreate}`,
        avatar:cloudImage.secure_url,
        avatarID:cloudImage.public_id
       })

     createBook.users =getUser
     createBook.save()

     getUser.shop.push(new mongoose.Types.ObjectId(createBook._id))
     getUser.save()

     res.status(201).json({
        message:"Book created successfully",
        Data: createBook
     })

    } catch (error) {
       res.status(400).json({
        message:"Failed to creat new book",
        data: error,
       }); 
    }
};

const getBook = async(req, res) =>{
    try {
      const getUser = await userModel.findById(req.params.id).populate("shop")
      res.status(200).json({
        message:"Your Book",
        data: getUser
      })  
    } catch (error) {
       res.status(402).json({
        message: "User unable to get book",
        data: error
       }); 
    }
};

const getOneBook =async(req, res) =>{
    try {
       const bookData =await storeModel.findById(req.params.id);
       res.status(200).json({
        message:"Single Book Gotten succesfully",
        data: bookData
       }) 
    } catch (error) {
        res.status(402).json({
            message: "Failed to get one Book",
            data: error
           });  
    }
};

const getAllBooks = async(req, res) =>{
    try {
        const getBooks = await storeModel.find()
        res.status(200).json({
            message:"All books fetched successfully",
            data : getBooks
        })
    } catch (error) {
        res.status(404).json({
            message:"Failed to get all Book",
            data:error
           }); 
    }
};

const deleteBook = async (req,res) =>{
    try {
        // To first find befor delete
       const getUser = await userModel.findById(req.params.id) 
        //This is to delete
        const removeBook =await storeModel.findByIdAndDelete(req.params.bookID) 

        getUser.shop.pull(removeBook)
        getUser.save()

        res.status(200).json({
            message:"Deleted successfully",
            data: getUser
        })
    } catch (error) {
        res.status(402).json({
            message: "Failed to deete Book",
            data: error
           });    
    }
};

const updateBook =async (req, res) =>{
    try {
       const{title,author} = req.body;
       const updateData = await storeModel.findByIdAndUpdate(req.params.id,{title,author},{new:true})
       res.status(200).json({
        message: " Book Updated successfully",
        data :updateData
       })

    } catch (error) {
        res.status(402).json({
            message: "Failed to update book",
            data: error
           });   
    }
}

module.exports ={createBook, getBook, getOneBook, deleteBook,getAllBooks, updateBook}
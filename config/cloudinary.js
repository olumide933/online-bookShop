const cloudinary =require("cloudinary").v2

cloudinary.config({
    cloud_name:"falowo-olumide",
    api_key:"616243884961271",
    api_secret:"Lzv0GkZYq3HF52TGPb_5RxlCstc",
    secure: true
});

module.exports =cloudinary;
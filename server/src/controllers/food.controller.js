import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Food} from "../models/food.model.js"
import {User} from "../models/user.model.js"
import {cloudinaryUpload} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateTokens = async(userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken,refreshToken};
    }
    catch{
        throw new ApiError(500,"Could not Generate Access and Refresh Token");
    }
}
const options ={
    httpOnly: true,
    secure: true
}
const home = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,{"home" :"Home route"}, "Successfully opened /"));
});

const postFood = asyncHandler(async(req,res)=>{
    //get user details
    const { address, pincode, state, city, organization, description, latitude, longitude, title,photo } = req.body;

    //validation - not empty
    if([address,pincode,state,city,latitude,longitude].some((field)=>{
        return field?.trim() ===""
    })) {
        throw new ApiError(400,"Some fields are Empty");
    }
    
    //check for images
    // let photoFile = null;
    // console.log(req.files);
    // if(req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
    //     photoFile = req.files.photo[0]; // Assuming only one photo is uploaded
    // }

    //upload to cloudinary,avatar
    // let photo;
    // if (photoFile) {
    //     photo = await cloudinaryUpload(photoFile);
    // }

    const owner = req.user;

    //create user obj 
    const food = await Food.create({
        address,
        pincode,
        state,
        city,
        organization,
        photo: photo ? photo : "", // If photo exists, use its URL, otherwise use an empty string
        owner: owner, // Assign the complete user object
        description,
        title,
        location:{
            type:"Point",
            coordinates:[parseFloat(longitude),parseFloat(latitude)]
        }
    });

    //populate owner field to get the full user object
    
    //remove pwd and refresh token 
    const createdFood = await Food.findById(food._id);
    //check for user creation
    if(!createdFood) {
        throw new ApiError(500,"Food addition failed");
    }
    // return res
    return res.status(201).json(new ApiResponse(200,createdFood, "Food added Successfully"));
});



const getFood = asyncHandler(async(req,res)=>{

    const {address,pincode,state,city,organization,description,latitude,longitude,setDistance} = req.body

    //validation - not empty
    // if([address,pincode,state,city,latitude,longitude].some((field)=>{
    //     field?.trim() ===""
    // }))
    // {
    //     throw new ApiError(400,"Some fields are Empty");
    // }
    
    const store_data = await Food.aggregate([
        {
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance: parseFloat(setDistance) * 1000, 
                    distanceField:"dist.calculated",
                    spherical:true
                }
        }   
    ]);

    return res.status(200).json(new ApiResponse(200,store_data, "All Foods fetched Successfully"));
    // const allFoods = await Food.find({});
    // if(!allFoods)
    // {
    //     return new ApiError(500,"Error Fetching Foods")
    // }
    // // return res
    // return res.status(200).json(new ApiResponse(200,allFoods, "All Foods fetched Successfully"));
});

export {
    postFood,
    getFood
}
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
});

const takeFood = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid food item ID format");
    }

    const food = await Food.findById(id);
    if(!food) {
        throw new ApiError(404, "Food item not found or already claimed");
    }

    await Food.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, {}, "Food item claimed successfully"));
});

export {
    postFood,
    getFood,
    takeFood
}
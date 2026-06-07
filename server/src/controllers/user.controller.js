import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {cloudinaryUpload} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import axios from "axios";


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
    secure: true,
    sameSite: 'none'
}
const home = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,{"home" :"Home route"}, "Successfully opened /"));
});

const registerUser = asyncHandler(async(req,res)=>{
    //get user details
    const {fullName,email,mobileNo,password} = req.body
    //validation - not empty
    if([fullName,email,mobileNo,password].some((field)=>{
        return field?.trim() ===""
    }))
    {
        throw new ApiError(400,"Some fields are Empty")
    }
    //check if user already exits
    const existedUser = await User.findOne({email})
    if(existedUser)
    {
        throw new ApiError(409,"User with same email exist")
    }
    //check fo images

    //upload to cloudinary,avatar
    //create user obj 
    const user = await User.create({
        fullName,
        email,
        password,
        mobileNo,
    })
    //remove pwd and refres token 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //check for user creation
    if(!createdUser) {
        throw new ApiError(500,"User registration failed")
    }
    // resturn res
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"));
} )

const loginUser = asyncHandler(async(req,res)=>
{   
    const options ={
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
    //req->body se data 
    const {email,password} = req.body
    if(!email)
    {
        throw new ApiError(400,"Email Required")
    }
    //username or email 
    const user = await User.findOne({email})
    //find the user
    if(!user)
    {
        throw new ApiError(404,"User not Exist")
    }
    //password check
    const isValidPassword = await user.isPasswordCorrect(password)
    if(!isValidPassword)
    {
        throw new ApiError(401,"Invalid user credentials");
    }
    //acess and refersh token 
    const {accessToken,refreshToken} = await generateTokens(user._id)
    //send cookies
    const LoggedInUser = await User.findById(user._id).select("-password -refreshToken")
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200, 
            {
                user: LoggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req,res) =>{
    const options ={
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,"Logout Succcessfully"))
})

const refreshAcessToken = asyncHandler(async(req,res) =>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken)
    {
        throw new ApiError(401,"Unauthorized request");

    }
    try{
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user)
        {
            throw new ApiError(401,"Invalid refresh token")
        }
        if(incomingRefreshToken!==user?.refreshToken)
        {
            throw new ApiError(401,"Refresh is token is expired or used")
        }
        const {accessToken,refreshToken} = await generateTokens(user._id)

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)

        .json(
            new ApiResponse(200,{accessToken,refreshToken},"Access token refreshed")
        )
    }
    catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
})
const changePassword = asyncHandler(async(req,res) =>{
    const {oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect)
    {
        throw new ApiError(400,"Invalid or Old Password")
    }
    user.password = newPassword;
    await user.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Changed Succesfully"))
})
const getCurrentUser = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"current user sent"))

})

const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName,email} = req.body

    if(!(fullName||email))
    {
        throw new ApiError(400,"Some feilds sre required to update")
    }

    const updateFields = {};
    if (fullName) {
        updateFields.fullName = fullName;
    }
    if (email) {
        updateFields.email = email;
    }

   const user = await  User.findByIdAndUpdate(
    req.user?._id,
    updateFields,
    {new:true}).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})
const isLoggedIn = asyncHandler(async(req,res)=>{
    let verifiedObj = {verified: false}
    let user = null;
    if(req.cookies && req.cookies.accessToken){
        const accessToken = req.cookies.accessToken;
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(user)
        {
            verifiedObj.verified =  true;
        }
    }
    const resObj = {
        user,verifiedObj
    }
    return res
    .status(200)
    .json(new ApiResponse(200,resObj,"Status Sent Successfully"));
})

const getChatbotResponse = asyncHandler(async (req, res) => {
    const { message } = req.body;
    if (!message) {
        throw new ApiError(400, "Message is required");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new ApiError(500, "Gemini API key is not configured on the server");
    }

    const systemPrompt = `You are the official AI Chatbot assistant for Bin2Bite, a full-stack food-sharing platform connecting donors and recipients.
Your goal is to assist users with food listings, platform navigation, claiming food, and improving donor engagement.
Here is the navigation structure and page list for Bin2Bite:
- Home Page: "/"
- About Us Page: "/about"
- Donate Food Page: "/DFood" (Where donors can enter their food's address, pincode, state, city, organization, description, title, coordinates, and upload a photo using Cloudinary)
- Browse/Get Food Page: "/GetFood" (Where recipients can view nearby food listings on a Google Map, filter by radius, and click "Take Food" to claim a listing)
- Request/Get Food Form Page: "/RFood"
- Login Page: "/login"
- Register Page: "/register"

Instructions for your response:
1. Always be polite, encouraging, and clear.
2. Provide direct path names when explaining where to go (e.g., "/DFood" for donating, "/GetFood" for claiming).
3. If they ask about maps, explain that they can see active food listings nearby on the Google Map on the "/GetFood" page.
4. Keep your response relatively concise (2-4 sentences is best) and easy to read.

User Question: ${message}`;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{ parts: [{ text: systemPrompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that. Please try again.";
        return res.status(200).json(new ApiResponse(200, { reply }, "Chatbot reply fetched successfully"));
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new ApiError(500, "Failed to get response from Gemini AI");
    }
});

export {
    home,
    registerUser,
    loginUser,
    logoutUser,
    refreshAcessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    isLoggedIn,
    getChatbotResponse
}
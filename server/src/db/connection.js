import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async ()=>{
    try
    {   
        const cleanUri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : '';
        console.log(`Attempting to connect to MongoDB: ${cleanUri.replace(/:([^@]+)@/, ":*****@")}/${DB_NAME}`);
        const connectionInstance =  await mongoose.connect(`${cleanUri}/${DB_NAME}`);
        console.log(`\nMongoDB connected  DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("Mongo connection error",error);
        throw error;
    }
}
export default connectDB;
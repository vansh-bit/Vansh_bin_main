import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async ()=>{
    try
    {   
        console.log(`Attempting to connect to MongoDB: ${process.env.MONGO_URI?.replace(/:([^@]+)@/, ":*****@")}/${DB_NAME}`);
        const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected  DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("Mongo connection error",error);
        throw error;
    }
}
export default connectDB;
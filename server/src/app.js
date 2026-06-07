import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    methods: ["POST", "GET", "DELETE", "OPTIONS", "PATCH", "PUT"],
    credentials: true
}))

app.use(express.json())  //limit can be added ... .json(limit: "16kb")
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(cookieParser());


//routes
import userRouter from './routes/user.routes.js'
import foodRouter from './routes/food.routes.js'
// import { home } from "./controllers/user.controller.js";
// app.route("/").get(home)
app.get("/", (req, res) => {
    res.send("Home route is Working!");
});
app.use("/api/users",userRouter)
app.use("/api/food",foodRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

export { app }
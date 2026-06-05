import { Router } from "express";
import {postFood,getFood} from "../controllers/food.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.route("/postfood").post(verifyJWT,postFood)
router.route("/getfood").post(verifyJWT,getFood)
export default router 
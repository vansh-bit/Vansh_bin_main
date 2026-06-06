import { Router } from "express";
import {postFood,getFood,takeFood} from "../controllers/food.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.route("/postfood").post(verifyJWT,postFood)
router.route("/getfood").post(verifyJWT,getFood)
router.route("/takefood/:id").delete(verifyJWT,takeFood)
export default router 
import { Router } from "express";
import { changePassword, getCurrentUser, isLoggedIn, loginUser, logoutUser, refreshAcessToken, registerUser, updateAccountDetails} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router()

router.route("/register").post(registerUser)   // route = /api/users/register

router.route("/login").post(loginUser)
router.route("/isloggedin").post(isLoggedIn)
//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshtoken").post(verifyJWT,refreshAcessToken)
router.route("/changepassword").post(verifyJWT,changePassword)
router.route("/currentuser").get(verifyJWT,getCurrentUser)
router.route("/updatedetails").patch(verifyJWT,updateAccountDetails)

export default router
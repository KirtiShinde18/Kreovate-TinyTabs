const { signin, registerEmployee, signout, sendOTP, verifyOTP, forgetPassword, changePassword } = require("../controller/auth.controller") 

// creating our express router ✨
const router = require("express").Router()

router
    .post("/signin", signin) // login route — let the user in 💅🔑
    .post("/register-employee", registerEmployee)
    .post("/signout", signout)
    .post("/send-otp", sendOTP)
    .post("/verify-otp", verifyOTP)
    .post("/forget-password", forgetPassword)
    .post("/change-password", changePassword)

    module.exports = router
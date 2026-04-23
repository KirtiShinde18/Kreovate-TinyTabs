const User = require("../models/User")  // our user model
const bcrypt = require("bcryptjs") // password security magic 🔐💖
const jwt = require("jsonwebtoken") // creating tokens like a pro ✨🔑
const crypto = require("crypto") // // for generating secure OTP 🔐✨
const { PRODUCTION, FRONTEND_URL } = require("../utils/config")
const { sendEmail } = require("../utils/email")
const { otpTemplate } = require("../email-templates/otpTemplate")
const { differenceInSeconds } = require("date-fns")
const { forgetPasswordTemplate } = require("../email-templates/forgetPasswordTemplate")

// login handler — let the user in 💖 🔑
exports.signin = async (req, res) => {
    try { 

        const {email, password} = req.body  // grabbing login details 💖 📩
        if(!email || !password){
            return res.status(400).json({message: "Email and pass are required "}) // missing info moment 😭
        }
        
        // checking if user exists in our system 💖🔍
        const result = await User.findOne({ email })
        if (!result) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                ? "Invalid Credentials 💔 🔐"
                : "Email not found 😭 📩"
            }) // user not found drama moment 🐞✨
        }
        
        // checking if account is active 👀 💖
        if(!result.active){
            return res.status(401).json({message: "Account Block By Queen 👸🏻"})  // access denied moment 😭

        }

        // verifying password — security check time 🔐✨
        const verify = await bcrypt.compare(password, result.password)
        
        if (!verify) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "Invalid Credentials 💔 🔐"
                    : "Incorrect password 😭 🔑"
            }) // password didn’t match bestie 💔
        }

        // JWT Token
        const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, {expiresIn: "1d"} ) // creating login token — 1 day glow ✨🔐
        if(result.role === "admin"){
            res.cookie("ADMIN", token, {
                httpOnly: true, // Prevent access from js (🔐 security)
                secure:  process.env.NODE_ENV === PRODUCTION, // Only send cookie over HTTPS in production
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 // 24 hours
            })
        }else {
            res.cookie("EMPLOYEE", token, {
                httpOnly: true, // Prevent access from js (🔐 security)
                secure:  process.env.NODE_ENV === PRODUCTION, // Only send cookie over HTTPS in production
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 // 24 hours
            })
        }

        res.status(200).json({message: "Login successful, Welcome back 🎉", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            profilePic: result.profilePic,
            _id: result._id,
            role: result.role,
        }}) // yay access granted ✨
        
    } catch (error) { 
        console.log(error); // uh-oh bug spotted 🐞
        res.status(500).json({message: "Login failed, try again 💔 🔐"})
        
    }
}
//=================================================  REGISTER EMPOYEE ========================================
// employee register handler — adding new team member 👩‍💻
exports.registerEmployee = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body // employee self signup 💖 📩
        
        // check if already exists 👀
        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({message: "User already exists 💔👩‍💻"}) 

        }

        // hash password 🔐✨
        const hashedPassword = await bcrypt.hash(password, 10)

        // create employee account 
        const newEmployee = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            role: "employee"
        })
        res.status(201).json({message: "Employee registered successfully, welcome to the team 🙌🏻", data: newEmployee}) // // yay new member joined 🎉💖 
        
    } catch (error) { 
        console.log(error); // uh-oh bug spotted 🐞
        res.status(500).json({message: "Employee registration failed, please try again 💔✨"})
        
    }
}

//=================================================  SIGNOUT =================================================
// signout handler — saying bye to the user 👋 💖
exports.signout = async (req, res) => {
    try {

        res.clearCookie("TOKEN") // clearing session cookie 🧼🔐
        res.status(200).json({ message: "Logged out successfully, see you soon 💖👋" }) // bye bye session ✨

    } catch (error) {
        console.log(error); // oops logout bug 🐞😭
        res.status(500).json({ message: "Logout failed, try again 💔🔐" }) // something went wrong 
    }
}

//=================================================  SEND OTP ================================================
// send OTP handler — magic code coming your way ✨ 📩
exports.sendOTP = async (req, res) => {
    try {

        const { username } = req.body 
        if(!username){
            return res.status(400).json({ message: "Email/Mobile is required" }) 
        }

        const result = await User.findOne({ $or : [{email: username}, {mobile: username}]})
        if(!result){
            return res.status(400).json({ message: "Email/Mobile not registered with us" }) 
        }
        // create otp 
        const otp = crypto.randomInt(100000, 1000000)

        // hased OTP
        // 1️⃣ to convert to string => String(otp) || otp.toString()
        const hashOTP = await bcrypt.hash(String(otp), 10)

        // add to database
        await User.findByIdAndUpdate(result._id, {otp: hashOTP, otpSendOn: new Date()})

        // send otp in email / sms / whatsapp
        await sendEmail({
            email: result.email,
            subject: "Login OTP",
            message: otpTemplate({
                name: result.name,
                otp,
                sec: process.env.OTP_EXPIRY,
                min: process.env.OTP_EXPIRY / 60
            })
        })

        res.status(200).json({ message: "OTP sent successfully, check your inbox 💖📩" }) // code delivered ✨

    } catch (error) {
        console.log(error); // OTP drama detected 🐞😭
        res.status(500).json({ message: "Failed to send OTP, try again 💔✨" }) // resend moment
    }
}

//=================================================  VERIFY OTP ==============================================
// verify OTP handler — checking your magic code ✨ 🔐
exports.verifyOTP = async (req, res) => {
    try {

        const { username, otp } = req.body 
         if(!username || !otp ){
            return res.status(400).json({ message: "All Fields Required" }) 
        }

        const result = await User.findOne({ $or : [{email: username}, {mobile: username}]})
        if(!result){
            return res.status(400).json({ message: "User Not Found" }) 
        }
        
        const verify = await bcrypt.compare(otp, String(result.otp))
        if(!verify){
            return res.status(400).json({ message: "Invalid OTP" }) 
            
        }

         // check expiry ⏳
        if(differenceInSeconds(new Date(result.otpSendOn)) > process.env.OTP_EXPIRY){
            await User.findByIdAndUpdate(result._id, {otp: null})
            return res.status(400).json({ message: "OTP expired ⏳💔" })
        }

        // JWT Token
        const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, {expiresIn: "1d"} ) // creating login token — 1 day glow ✨🔐
        res.cookie("TOKEN", token, {
            httpOnly: true, // Prevent access from js (🔐 security)
            secure:  process.env.NODE_ENV === PRODUCTION, // Only send cookie over HTTPS in production
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }) 

        res.status(200).json({message: "Login successful, Welcome back 🎉", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            profilePic: result.profilePic,
            _id: result._id,
            role: result.role,
        }}) // yay access granted ✨

        // res.status(200).json({ message: "OTP verified successfully, welcome 💖✨" }) // access granted 🎉

    } catch (error) {
        console.log(error); // OTP didn’t match drama 🐞😭
        res.status(500).json({ message: "Invalid OTP, please try again 💔🔐" }) // retry moment
    }
}

//=================================================  FORGET PASSWORD =========================================
// forgot password handler — reset magic begins ✨ 🔐
exports.forgetPassword = async (req, res) => {
    try {
        const { username } = req.body 
        if(!username){
            return res.status(400).json({ message: "Email/Mobile is required" }) 
        }

        const result = await User.findOne({ $or : [{email: username}, {mobile: username}]})
        if(!result){
            return res.status(400).json({ message: "Email/Mobile not registered with us" }) 
        }

        // token
        const accessToken = jwt.sign({_id: result._id}, process.env.JWT_KEY, {expiresIn: "15m"})
        
        // db 
        await User.findByIdAndUpdate(result._id, {accessToken})

        // http://local:3000/forget-password/?token=&{accessToken}
        const link = `${FRONTEND_URL}/forget-password/?token=${accessToken}`

        await sendEmail({
            email: result.email,
            subject: "Request For Change Password",
            message: forgetPasswordTemplate({
                name: result.name,
                resetLink: link
            })
        }) 

        res.status(200).json({ message: "Password reset link sent, check your inbox 💖 📩" }) // help is on the way ✨

    } catch (error) {
        console.log(error); // password reset drama 🐞 😭
        res.status(500).json({ message: "Failed to process request, try again 💔 🔐" }) // retry moment
    }
}

//=================================================  CHANGE PASSWORD ================================================
// change password handler — updating your secret key 🔐 ✨
exports.changePassword = async (req, res) => {
    try {
        // 
        const { token } = req.query
        const { password } = req.body

        if(!token){
            return res.status(400).json({ message: "Token Required" }) 
        }

        // db 
        const result = await User.findOne({ accessToken : token})
        if(!result){
            return res.status(400).json({ message: "Token Not found" }) 
        }
        
        jwt.verify(token, process.env.JWT_KEY, async(err , decode) => {
            if(err){
                console.log(err);
                await User.findByIdAndUpdate(result._id, {accessToken: null})
                return res.status(400).json({ message: "Invald Token" }) 

            }

        // hash password 
        const hash = await bcrypt.hash(password, 10)

        // db update 
        await User.findByIdAndUpdate(result._id, {password: hash})

        res.status(200).json({ message: "Password changed successfully, you're all set 💖 🔐" }) // glow up complete ✨

        })


    } catch (error) {
        console.log(error); // password change drama 🐞😭
        res.status(500).json({ message: "Failed to change password, try again 💔✨" }) // retry moment
    }
}
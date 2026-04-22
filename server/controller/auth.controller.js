
// login handler — let the user in 💖🔑
exports.signin = async (req, res) => {
    try {

        res.status(200).json({message: "Login successful, Welcome back 🎉"}) // yay access granted ✨
        
    } catch (error) { 
        console.log(error); // uh-oh bug spotted 🐞
        res.status(500).json({message: "Login failed, try again 💔🔐"})
        
    }
}

// employee register handler — adding new team member 👩‍💻
exports.registerEmployee = async (req, res) => {
    try {

        res.status(200).json({message: "Employee registered successfully, welcome to the team 🙌🏻"}) // // yay new member joined 🎉💖 
        
    } catch (error) { 
        console.log(error); // uh-oh bug spotted 🐞
        res.status(500).json({message: "Employee registration failed, please try again 💔✨"})
        
    }
}

// signout handler — saying bye to the user 👋💖
exports.signout = async (req, res) => {
    try {

        res.status(200).json({ message: "Logged out successfully, see you soon 💖👋" }) // bye bye session ✨

    } catch (error) {
        console.log(error); // oops logout bug 🐞😭
        res.status(500).json({ message: "Logout failed, try again 💔🔐" }) // something went wrong 
    }
}

// send OTP handler — magic code coming your way ✨📩
exports.sendOTP = async (req, res) => {
    try {

        res.status(200).json({ message: "OTP sent successfully, check your inbox 💖📩" }) // code delivered ✨

    } catch (error) {
        console.log(error); // OTP drama detected 🐞😭
        res.status(500).json({ message: "Failed to send OTP, try again 💔✨" }) // resend moment
    }
}

// verify OTP handler — checking your magic code ✨🔐
exports.verifyOTP = async (req, res) => {
    try {

        res.status(200).json({ message: "OTP verified successfully, welcome 💖✨" }) // access granted 🎉

    } catch (error) {
        console.log(error); // OTP didn’t match drama 🐞😭
        res.status(500).json({ message: "Invalid OTP, please try again 💔🔐" }) // retry moment
    }
}

// forgot password handler — reset magic begins ✨🔐
exports.forgetPassword = async (req, res) => {
    try {

        res.status(200).json({ message: "Password reset link sent, check your inbox 💖📩" }) // help is on the way ✨

    } catch (error) {
        console.log(error); // password reset drama 🐞😭
        res.status(500).json({ message: "Failed to process request, try again 💔🔐" }) // retry moment
    }
}

// change password handler — updating your secret key 🔐✨
exports.changePassword = async (req, res) => {
    try {

        res.status(200).json({ message: "Password changed successfully, you're all set 💖🔐" }) // glow up complete ✨

    } catch (error) {
        console.log(error); // password change drama 🐞😭
        res.status(500).json({ message: "Failed to change password, try again 💔✨" }) // retry moment
    }
}
require("dotenv").config({path: "./../.env"}) // 🌸 secret keys loading... keep it cute & secure
const mongoose = require("mongoose"); // 🍃 talking to MongoDB like besties
const User = require("../models/User"); // importing our User model
const bcrypt = require("bcryptjs") // hashing passwords like a secure queen 👩‍💻 🔐 ✨


// function to create our main admin queen 👑
exports.seedAdmin = async () => {
    try {
        // DB Connect
        await mongoose.connect(process.env.MONGO_URL)
        console.log(" ✅ DB Connected");
        
        // Check Already exists
        const result = await User.findOne({ role: "admin" }) // check queen 👀
        if(result){
            console.log("⚠️ Queen Already Exist 🚫👑 ")
            process.exit(1)
            
        }

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD; 

        // hasing pass 🙈
        const hashed = await bcrypt.hash(password, 10)

        // creating the admin user
        await User.create({
            name:"admin",
            email,
            password: hashed,
            mobile: 9209123023,  // you can totally change this later 💁‍♀️
            role: "admin" // giving full power vibes 💼
        })
        console.log(" 👑 Queen Created Successfully 💯 — she’s here and she’s unstoppable 🔥"); // yay! admin is ready to slay 💃
        process.exit(1)
    } catch (error) {
        console.log(error); // oops 😭.... something broke..  but we’ll fix it like queens do
        process.exit(1)
        
    }
}
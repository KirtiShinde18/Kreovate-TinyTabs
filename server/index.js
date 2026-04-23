require("dotenv").config() // 🌸 secret keys loading... keep it cute & secure
const express = require("express")  // 🚀 bringing the server vibes
const mongoose  = require("mongoose"); // 🍃 talking to MongoDB like besties
const { FRONTEND_URL } = require("./utils/config.js");
const cors = require("cors")

const app = express(); // 💅 main character energy (My app starts here)

// 💖 Connecting to MongoDB (pls connect fast, no drama)
mongoose.connect(process.env.MONGO_URL)

app.use(express.json()) //👈 body parser middleware

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

// -----------------------------
// Routes
// -----------------------------
app.use("/api/auth", require("./routes/auth.routes.js")) // auth routes plugged in 🔐


// 🎀 Root route — just a cute lil hello from My API
app.use("/", (req, res) => {
    res.status(200).json({message : `Kreovate - TinyTabs 🌸 Api Running ... in ${process.env.NODE_ENV} mode`})
})


// 🌷 When DB says “I’m ready 💃”
mongoose.connection.once("open", () => {
    console.log("✅ DB Connected "); // 🥹 finally, no more connection issues
    
    // 🚀 Launching the server like a queen
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running On ${process.env.PORT}`); // 💻 My backend is officially slaying
        console.log(`mode: ${process.env.NODE_ENV}`); // 🌙 dev or prod? I love clarity
        
    })
    
})

module.exports = app;
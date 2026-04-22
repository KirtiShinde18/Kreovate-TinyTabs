const mongoose = require("mongoose")
module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, require: true, lowercase: true, unique: true, trim: true },
    password: { type: String, require: true},
    mobile: { type: String, require: true},

    active: { type: String, default: true},
    role: { type: String, enum: ["admin", "emplyee"], default: "employee"},
    profilePic: { type: String},

}, {timestamps: true}))


const nodemailer = require("nodemailer")

exports.sendEmail = ({ email, subject, message }) =>
    new Promise(async (resolve, reject) => {
        try {

            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            })

            await transport.sendMail({
                to: email,
                subject,
                html: message
            })

            console.log("Email sent successfully  📩")
            resolve("Email sent successfully ✅")

        } catch (error) {
            console.log(error) // email drama 🐞😭
            reject("Unable to send email 💔")
        }
    })
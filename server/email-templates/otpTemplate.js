const { baseTemplate } = require("./baseTemplate")

exports.otpTemplate = ({ name, otp, min, sec }) => {
    const content = `
        <div style="text-align:center;">

            <h2 style="color:#ff4d88;margin-bottom:10px;">Your OTP 💖</h2>

            <p style="font-size:14px;">Hi, ${name} 👋🏻 ✨</p>

            <p style="color:#555;">Use the following OTP to continue your verification:</p>

            <div style="
                font-size:28px;
                font-weight:bold;
                letter-spacing:5px;
                background:#fff0f6;
                padding:10px 20px;
                display:inline-block;
                border-radius:10px;
                color:#ff4d88;
                margin:15px 0;
            ">
                ${otp}
            </div>

            <p style="font-size:13px;color:#777;">
                This OTP will expire in <b>${min} min (${sec} sec)</b> ⏳
            </p>

            <p style="font-size:12px;color:#999;margin-top:15px;">
                If you did not request this, please ignore this email 💔
            </p>

        </div>
    `

    return baseTemplate({
        title: "OTP Verification",
        content
    })
}
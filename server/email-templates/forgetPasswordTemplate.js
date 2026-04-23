const { baseTemplate } = require("./baseTemplate")

exports.forgetPasswordTemplate = ({ name, resetLink }) => {
    const content = `
        <div style="text-align:center;">

            <h2 style="color:#ff4d88;">Reset Your Password 💖</h2>

            <p>Hi ${name} 👋🏻 ✨</p>

            <p>You requested to reset your password.</p>

            <a href="${resetLink}" style="
                display:inline-block;
                margin:15px 0;
                padding:10px 20px;
                background:#ff4d88;
                color:#fff;
                text-decoration:none;
                border-radius:8px;
            ">
                Reset Password 💌
            </a>

            <p style="font-size:13px;color:#555;">
                This link will expire in 15 minutes ⏳
            </p>

            <p style="font-size:12px;color:#999;">
                If you did not request this, please ignore this email 💔
            </p>

        </div>
    `

    return baseTemplate({
        title: "Reset Password",
        content
    })
}
exports.baseTemplate = ({ title, content }) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>

<body style="margin:0;padding:0;background:linear-gradient(135deg,#ffe6f0,#fff5fa);font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
        <tr>
            <td align="center">

                <!-- Main Card -->
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(255,105,180,0.15);">

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(90deg,#ff6fa3,#ffb6d9);padding:25px;text-align:center;">
                            <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px;">
                                Kreovate ✨ TinyTabs 🌸
                            </h1>
                            <p style="color:#fff;margin:5px 0 0;font-size:12px;opacity:0.9;">
                                Built with LoVe & CODE 👩‍💻
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:35px;color:#333;font-size:14px;line-height:1.6;">
                            ${content}
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#fff0f6;padding:18px;text-align:center;font-size:12px;color:#777;">
                            © ${new Date().getFullYear()} Kreovate 🌸 DESIGN BY KIRTI <br />
                            Maharashtra, India 💖<br />
                            <span style="color:#ff4d88;">Made with LoVe & CODE ✨</span>
                        </td>
                    </tr>

                </table>
                <!-- End Card -->

            </td>
        </tr>
    </table>

</body>

</html>
    `
}
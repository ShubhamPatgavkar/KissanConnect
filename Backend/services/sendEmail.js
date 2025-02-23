const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// ✅ Debug: Check if credentials are loaded
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const sendEmail = async (farmerEmail, contactDetails) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("❌ Missing email credentials in .env");
            return { success: false, message: "Missing email credentials" };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: farmerEmail,
            subject: 'New Crop Request from Buyer',
            html: `
                <h2>New Crop Purchase Request</h2>
                <p><strong>Crop Quantity:</strong> ${contactDetails.cropQuantity} kg</p>
                <p><strong>Delivery Date:</strong> ${contactDetails.deliveryDate}</p>
                <p><strong>Delivery Address:</strong> ${contactDetails.deliveryAddress}</p>
                <p><strong>Additional Notes:</strong> ${contactDetails.additionalNotes || "N/A"}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email successfully sent to", farmerEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
        return { success: false, message: error.message };
    }
};

module.exports = sendEmail;

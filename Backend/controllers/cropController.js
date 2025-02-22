const Crop = require('../Models/Crop');
const sendEmail = require('../services/sendEmail');

const postCropDetails = async (req, res) => {
    try {
        // Logging for debugging
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);
        console.log('Authenticated User:', req.user);
        console.log("Received farmerEmail:", req.body.farmerEmail); // ✅ Debug log

        // Destructure required fields from the request body
        const { cropName, quantity, quantityType, price, description, location, farmerName, farmerEmail } = req.body;

        // Check for missing required fields
        if (!cropName || !quantity || !quantityType || !price || !location || !farmerName || !farmerEmail) {
            return res.status(400).json({ message: 'All fields are required: cropName, quantity, quantityType, price, location, farmerName, farmerEmail' });
        }

        // Get the image filename if uploaded
        const image = req.file ? req.file.filename : null;

        // Ensure user information is available in the request
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User information is missing' });
        }

        // Create a new Crop document
        const crop = new Crop({
            cropName,
            quantity,
            quantityType,
            price,
            description,
            location,
            image,
            farmerName,
            farmerEmail, // Save the farmer's name
            user: req.user.id, // Associate the crop with the authenticated user
        });

        // Save the crop details to the database
        await crop.save();

        // Send email to the farmer with customer details
        const contactDetails = {
            cropQuantity: quantity,
            deliveryDate: req.body.deliveryDate || "Not Provided",
            deliveryAddress: req.body.deliveryAddress || "Not Provided",
            additionalNotes: req.body.additionalNotes || "None",
        };

        await sendEmail(farmerEmail, contactDetails); // ✅ Send email

        // Return success response
        res.status(201).json({
            message: 'Crop details posted successfully!',
            crop,
        });
    } catch (error) {
        console.error('Error posting crop details:', error.message);

        // Return server error response
        res.status(500).json({
            message: 'Server Error: Unable to post crop details',
            error: error.message,
        });
    }
};

module.exports = { postCropDetails };

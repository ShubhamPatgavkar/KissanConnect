const express = require('express');
const { postCropDetails } = require('../controllers/cropController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // File upload middleware
const Crop = require('../Models/Crop');

const router = express.Router();

// Protected route to post crop details with image upload
router.post('/post', authMiddleware, upload.single('image'), postCropDetails);

router.get("/:id", async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ message: "Crop not found" });

        res.json({ farmerEmail: crop.farmerEmail });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// GET /api/crops - Fetch all crops
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find(); // Fetch all crops from the database
        res.status(200).json(crops);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;

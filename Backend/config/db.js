const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace the environment variable with the direct MongoDB connection string
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/KissanConnect', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;

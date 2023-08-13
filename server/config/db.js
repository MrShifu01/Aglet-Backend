import mongoose from "mongoose";

// Function to connect to the MongoDB database using Mongoose
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
        // If successful, log the host to which the database is connected
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (e) {
        // If there's an error during the connection, log the error
        console.log(`Error: ${e}`)
        
        // Exit the process with a failure status code
        process.exit(1)
    }
}

export default connectDB;

import connectDB from '../config/db.js';
import Movie from '../models/movieModel.js';
import dotenv from 'dotenv'
dotenv.config()

// Delete movie data from MongoDB
const deleteData = async () => {
    try {
        await Movie.deleteMany();
        
        console.log('Data delete success');
        process.exit();
    } catch (error) {
        console.error('Error with data delete', error.message);
        process.exit(1);
    }
}

// Connect to the Database first, then delete the data
connectDB().then(() => {
    deleteData()
})  


import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, {
  timestamps: true
  });

const User = mongoose.model('User', userSchema);

export default User;

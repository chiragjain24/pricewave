import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true }, 
        name: {type: String}, 
        username: {type: String}, 
        profilePic: { type: String }, 
        coverPic: { type: String }, 
        provider:{type: String},
        products: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] , default: []},
        
    },
    {
        timestamps: true,  // gives  createdAt, modifiedAt
    }
);

// Check if User Model exists or create one
export default mongoose.models.User || mongoose.model('User', UserSchema);
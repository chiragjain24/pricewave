import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

  urlId: { type: String, required: true, unique: true },
  url: { type: String, required: true},
  title: { type: String, required: true },
  image: { type: String, required: true },
  currency: { type: String, required: true },
  mrp: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  isOutOfStock: { type: Boolean, default: false },
  reviewsCount: { type: Number },
  stars: { type: Number },

  priceHistory: [
    { 
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    },
  ],

  highestPrice: { type: Number },
  lowestPrice: { type: Number },
  averagePrice: { type: Number },

  users: {
    type: [{ email: { type: String, required: true } }],
    default: []  // Set default value for users array
  },
  
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
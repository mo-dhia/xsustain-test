import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Routes
import recipeRoutes from '../routes/recipeRoutes.js'
import userRoutes from '../routes/userRoutes.js'

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Connection URI:', process.env.MONGODB_URI);
  }
};

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipe', recipeRoutes);

// For Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
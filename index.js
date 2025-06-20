import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRoutes from './src/events/event.route.js';
import concernRoutes from './src/concerns/concern.route.js';

import cors from 'cors';
dotenv.config();
const port = process.env.PORT || 5000; 

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://delsu-hub-frontend-i7fo.vercel.app"],
    credentials: true}
));

app.use("/api/concerns", concernRoutes);
app.use("/api/events", eventRoutes);
// Connect to MongoDB
async function main() {
 await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Book server is running!');
    });
}
main().then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
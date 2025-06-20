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
    origin: ['http://localhost:5173', "https://delsu-hub-frontend-upnn.vercel.app"],
    credentials: true}
));

app.use("/api/concerns", concernRoutes);
app.use("/api/events", eventRoutes);
// Connect to MongoDB
app.get("/", (req, res) => {
  res.send("Delsu Server is running!");
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("Mongodb connect successfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
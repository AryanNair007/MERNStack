import express from 'express';
import { config as dotenv } from 'dotenv'; dotenv();
import colors from 'colors';

import router from './routes/goalsRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';

import mongoose from 'mongoose';
connectDB();
// mongoose.connect("mongodb://0.0.0.0:27017/Mernapp");

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', router )

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));



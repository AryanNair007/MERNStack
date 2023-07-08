import express from 'express';
import { config } from 'dotenv'; config();
import colors from 'colors';

import goalsRouter from './routes/goalsRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

connectDB();

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalsRouter )
app.use('/api/users', usersRouter )

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));



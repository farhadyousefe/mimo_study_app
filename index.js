import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
import Joi from 'joi';
import authRouter from './routes/auth.js';
import courseRoute from './routes/courses.js';

const dbDebug = debug('app:db');
dbDebug.color = 2;
const httpDebug = debug('app:http');
httpDebug.color = 3;

const app = express();
const PORT = process.env.PORT;
const Database_URL = process.env.MONGODB_MIMO_STUDY;
const privateKey = process.env.JWT_PRIVATE_KEY;

if (!privateKey) {
  httpDebug('FATAL ERROR: JWT_PRIVATE_KEY is not defined in the environment.');
  process.exit(1);
}

app.use(express.json());
app.use('/api/v1/mimo', authRouter);
app.use('/api/v1/courses', courseRoute);

mongoose
  .connect(Database_URL)
  .then(() => {
    httpDebug('Connected to Database successfully');
  })
  .catch((err) => {
    dbDebug('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  appDebug(`Server is running on port ${PORT}`);
});

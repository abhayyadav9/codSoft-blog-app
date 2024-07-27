import express from 'express';
import { connectToDatabase } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
import cors from 'cors'; // Use import syntax for cors
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/', router);

// Middleware
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connectToDatabase(USERNAME, PASSWORD);

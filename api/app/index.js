import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import connectDb from "./models/connectdb";

import cardRoutes from './routes/card';


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send({
        "message": "Hello, I am API",
        "mongo_connection": !!mongoose.connection.readyState
    });
});

// route groups
app.use('/cards', cardRoutes);


connectDb().then(async () => {
    app.listen(process.env.API_PORT, () =>
        console.log(`Example app listening on port ${process.env.API_PORT}!`),
    );
});

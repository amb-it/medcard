import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import connectDb from "./models/connectdb";

import someEntityRoutes from './routes/some-entity';


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
app.use('/some-entity', someEntityRoutes);


connectDb().then(async () => {
    app.listen(process.env.API_PORT, () =>
        console.log(`Example app listening on port ${process.env.API_PORT}!`),
    );
});

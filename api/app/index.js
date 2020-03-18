import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDb from "./core/connectdb";

import devRoutes from './routes/dev/dev';
import userRoutes from './routes/user';
import cardRoutes from './routes/card';
import cardTypeRoutes from './routes/cardType';


const app = express();
app.use(bodyParser.json());
app.use(cors());

// output all requests to console
app.all("*", function (req, resp, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    return res.send({"message": "Hello, I am API"});
});

// route groups
app.use('/dev', devRoutes);
app.use('/user', userRoutes);
app.use('/cards', cardRoutes);
app.use('/card-types', cardTypeRoutes);

app.use(express.static('user_files/sandbox'));

connectDb().then(async () => {
    app.listen(process.env.NODE_API_PORT, () =>
        console.log(`Node app listens port ${process.env.NODE_API_PORT}!`),
    );
});

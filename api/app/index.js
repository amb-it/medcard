import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDb from "./models/connectdb";

import someEntityRoutes from './routes/some-entity';


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send({"message":"Hello, I am API"});
});

// route groups
app.use('/some-entity', someEntityRoutes);


connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});

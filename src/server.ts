import "reflect-metadata";
import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from "helmet";

import routes from './routes';

import { errors } from 'celebrate';
import { createConnection } from "typeorm";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);

app.get('/healthcheck', function (req: Request, res: Response) {
    res.status(200).send('Healthy');
});

app.use(errors());

app.listen(process.env.PORT || 3333, () => {
    console.log('Listen at port 3333...');
    createConnection().catch(error => console.log(error));
});
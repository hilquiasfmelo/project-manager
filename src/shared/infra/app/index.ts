import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { resolve } from 'path';

import '@shared/infra/typeorm';
import { ServerError } from '@shared/errors/ServerError';
import { router } from '../routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  '/files',
  express.static(resolve(__dirname, '..', '..', '..', '..', 'uploads')),
);
app.use(router);

app.use(ServerError);

export { app };

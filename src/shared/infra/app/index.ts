import 'dotenv/config';
import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json);

export { app };

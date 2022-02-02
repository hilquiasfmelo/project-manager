import { Router } from 'express';

import { CreateSessionController } from '../services/CreateSession/CreateSessionController';

export const sessionRouter = Router();

sessionRouter.post('/', new CreateSessionController().handle);

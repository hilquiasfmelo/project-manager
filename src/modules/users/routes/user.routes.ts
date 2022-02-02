import { Router } from 'express';

import { CreateUserController } from '../services/CreateUser/CreateUserController';

export const userRouter = Router();

userRouter.post('/', new CreateUserController().handle);

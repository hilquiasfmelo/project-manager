import { Router } from 'express';

import { CreateUserController } from '../services/CreateUser/CreateUserController';
import { EnableUserController } from '../services/EnableUser/EnableUserController';

export const userRouter = Router();

userRouter.post('/', new CreateUserController().handle);
userRouter.patch('/enable/:id', new EnableUserController().handle);

import { Router } from 'express';

import { userRouter } from '@modules/users/routes/user.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';

export const router = Router();

router.use(`/${process.env.PREFIX_ROUTER}/users`, userRouter);
router.use(`/${process.env.PREFIX_ROUTER}/session`, sessionRouter);

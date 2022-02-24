import { Router } from 'express';

import { authenticate } from '@shared/infra/middlewares/auth';

import { CreateProjectController } from '../services/CreateProject/CreateProjectController';
import { ListAllProjectController } from '../services/ListAllProject/ListAllProjectController';
import { UpdateProjectController } from '../services/UpdateProject/UpdateProjectController';
import { ShowProjectController } from '../services/ShowProject/ShowProjectController';
import { UpdateProjectStatusController } from '../services/UpdateProjectStatus/UpdateProjectStatusController';

export const projectRouter = Router();

projectRouter.use(authenticate);

projectRouter.post('/', new CreateProjectController().handle);
projectRouter.get('/', new ListAllProjectController().handle);
projectRouter.get('/:id', new ShowProjectController().handle);
projectRouter.put('/:id', new UpdateProjectController().handle);
projectRouter.patch('/:id', new UpdateProjectStatusController().handle);

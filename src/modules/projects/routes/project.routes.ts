import { Router } from 'express';
import multer from 'multer';

import { authenticate } from '@shared/infra/middlewares/auth';

import { multerConfig } from '@config/multer';

import { CreateProjectController } from '../services/CreateProject/CreateProjectController';
import { ListAllProjectController } from '../services/ListAllProject/ListAllProjectController';
import { UpdateProjectController } from '../services/UpdateProject/UpdateProjectController';
import { ShowProjectController } from '../services/ShowProject/ShowProjectController';
import { UpdateProjectStatusController } from '../services/UpdateProjectStatus/UpdateProjectStatusController';
import { UploadLogoOfProjectController } from '../services/UploadLogoOfProject/UploadLogoOfProjectController';
import { ListAllProjectOfUserController } from '../services/ListAllProjectOfUser/ListAllProjectOfUserController';

export const projectRouter = Router();

projectRouter.use(authenticate);

projectRouter.post(
  '/',
  multer(multerConfig).single('logo'),
  new CreateProjectController().handle,
);

projectRouter.put(
  '/upload/:id',
  multer(multerConfig).single('logo'),
  new UploadLogoOfProjectController().handle,
);

projectRouter.get('/', new ListAllProjectController().handle);
projectRouter.get(
  '/users/:user_id',
  new ListAllProjectOfUserController().handle,
);
projectRouter.get('/:id', new ShowProjectController().handle);
projectRouter.put('/:id', new UpdateProjectController().handle);
projectRouter.patch('/:id', new UpdateProjectStatusController().handle);

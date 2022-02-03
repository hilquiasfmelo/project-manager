import { Router } from 'express';

import { CreateClientController } from '../services/CreateClient/CreateClientController';
import { ListClientsController } from '../services/ListClients/ListClientsController';

export const clientRouter = Router();

clientRouter.post('/', new CreateClientController().handle);
clientRouter.get('/', new ListClientsController().handle);

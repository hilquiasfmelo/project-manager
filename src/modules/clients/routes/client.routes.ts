import { Router } from 'express';

import { CreateClientController } from '../services/CreateClient/CreateClientController';
import { ListClientsController } from '../services/ListClients/ListClientsController';
import { UpdateClientController } from '../services/UpdateClient/UpdateClientController';

export const clientRouter = Router();

clientRouter.post('/', new CreateClientController().handle);
clientRouter.get('/', new ListClientsController().handle);
clientRouter.put('/toupdate/:id', new UpdateClientController().handle);

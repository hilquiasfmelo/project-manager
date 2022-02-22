import { Router } from 'express';

import { authenticate } from '@shared/infra/middlewares/auth';

import { CreateClientController } from '../services/CreateClient/CreateClientController';
import { DeleteClientController } from '../services/DeleteClient/DeleteClientController';
import { ListClientsController } from '../services/ListClients/ListClientsController';
import { PaginatedClientController } from '../services/PaginatedClient/PaginatedClientController';
import { SearchClientController } from '../services/SearchClient/SearchClientController';
import { UpdateClientController } from '../services/UpdateClient/UpdateClientController';

export const clientRouter = Router();

clientRouter.use(authenticate);

clientRouter.post('/', new CreateClientController().handle);
clientRouter.get('/', new ListClientsController().handle);
clientRouter.put('/toupdate/:id', new UpdateClientController().handle);
clientRouter.get('/paginated', new PaginatedClientController().handle);
clientRouter.get('/search', new SearchClientController().handle);
clientRouter.delete('/:id', new DeleteClientController().handle);

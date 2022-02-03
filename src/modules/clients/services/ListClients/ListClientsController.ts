import { Request, Response } from 'express';

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ListClientsService } from './ListClientsService';

export class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const listClientsService = new ListClientsService(clientRepository);

    const clients = await listClientsService.execute();

    return response.status(200).json(clients);
  }
}

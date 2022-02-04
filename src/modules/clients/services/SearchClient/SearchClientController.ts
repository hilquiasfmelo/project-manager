import { Request, Response } from 'express';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { SearchClientService } from './SearchClientService';

export class SearchClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const clientRepository = new ClientRepository();

    const searchClientService = new SearchClientService(clientRepository);

    const clients = await searchClientService.execute(name?.toString() || '');

    return response.status(200).json(clients);
  }
}

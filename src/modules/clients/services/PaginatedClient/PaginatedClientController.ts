import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { Request, Response } from 'express';
import { PaginatedClientService } from './PaginatedClientService';

export class PaginatedClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const clientRepository = new ClientRepository();

    const paginatedClientService = new PaginatedClientService(clientRepository);

    const clients = await paginatedClientService.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return response.status(200).json(clients);
  }
}

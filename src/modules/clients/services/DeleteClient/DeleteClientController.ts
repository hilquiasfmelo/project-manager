import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { Request, Response } from 'express';
import { DeleteClientService } from './DeleteClientService';

export class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const clientRepository = new ClientRepository();

    const deleteClientService = new DeleteClientService(clientRepository);

    await deleteClientService.execute(id);

    return response.status(204).send();
  }
}

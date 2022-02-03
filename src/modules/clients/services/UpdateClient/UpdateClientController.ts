import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { Request, Response } from 'express';
import { UpdateClientService } from './UpdateClientService';

export class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, telephone, cpf } = request.body;

    const clientRepository = new ClientRepository();

    const updateClientService = new UpdateClientService(clientRepository);

    const clientUpdated = await updateClientService.execute({
      id,
      name,
      email,
      telephone,
      cpf,
    });

    return response.status(201).json(clientUpdated);
  }
}

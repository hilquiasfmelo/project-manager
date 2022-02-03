import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { Request, Response } from 'express';
import { CreateClientService } from './CreateClientService';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, telephone, cpf } = request.body;

    const clientRepository = new ClientRepository();

    const createClientService = new CreateClientService(clientRepository);

    const client = await createClientService.execute({
      name,
      email,
      telephone,
      cpf,
    });

    return response.status(201).json(client);
  }
}

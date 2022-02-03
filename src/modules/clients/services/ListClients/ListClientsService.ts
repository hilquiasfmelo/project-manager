import { Client } from '@modules/clients/entities/Client';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { AppError } from '@shared/errors/AppError';

export class ListClientsService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAll();

    if (clients.length === 0) {
      throw new AppError('There are no registered customers.', 404);
    }

    return clients;
  }
}

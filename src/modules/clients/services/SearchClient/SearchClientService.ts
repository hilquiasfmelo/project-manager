import { Client } from '@modules/clients/entities/Client';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { AppError } from '@shared/errors/AppError';

export class SearchClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute(name: string): Promise<Client[]> {
    const clients = await this.clientRepository.findAllByName(name);

    if (clients.length === 0) {
      throw new AppError(
        // Parece que não há boas correspondências para sua pesquisa
        'Looks like there are no good matches for your search',
        404,
      );
    }

    return clients;
  }
}

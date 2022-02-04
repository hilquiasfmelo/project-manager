import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('User not found', 404);
    }

    await this.clientRepository.delete(id);
  }
}

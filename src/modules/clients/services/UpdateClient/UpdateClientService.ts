import { AppError } from '@shared/errors/AppError';
import { Client } from '@modules/clients/entities/Client';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  telephone: string;
  cpf: string;
}

export class UpdateClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute({
    id,
    name,
    email,
    telephone,
    cpf,
  }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    // Verifica se o cliente existe
    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const clientWithUpdatedEmail = await this.clientRepository.findByEmail(
      email,
    );

    // Verifica se o e-mail que está sendo alterado, está logado no momento
    if (clientWithUpdatedEmail && clientWithUpdatedEmail.id === id) {
      throw new AppError('E-mail already in use.');
    }

    const clientWithUpdatedCPF = await this.clientRepository.findByCPF(cpf);

    // Verifica se caso o client esteja querendo mudar o cpf se não já existe um
    if (clientWithUpdatedCPF && clientWithUpdatedCPF.id === id) {
      throw new AppError('You cannot change to an already existing cpf.');
    }

    Object.assign(client, {
      name,
      email,
      telephone,
      cpf,
    });

    const updatedClient = await this.clientRepository.save(client);

    return updatedClient;
  }
}

import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { Client } from '@modules/clients/entities/Client';
import { getRepository, ILike, Repository } from 'typeorm';
import { IClientRepository } from '../interfaces/IClientRepository';

export class ClientRepository implements IClientRepository {
  private clientRepository: Repository<Client>;

  constructor() {
    this.clientRepository = getRepository(Client);
  }

  public async findAll(): Promise<Client[]> {
    const client = await this.clientRepository.find();

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.clientRepository.findOne(id);

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.clientRepository.findOne({ email });

    return client;
  }

  public async findByCPF(cpf: string): Promise<Client | undefined> {
    const client = await this.clientRepository.findOne({ cpf });

    return client;
  }

  public async findAllByName(name: string): Promise<Client[]> {
    return this.clientRepository.find({
      name: ILike(`%${name}%`),
    });
  }

  public async findAllPaginated(page: number): Promise<[Client[], number]> {
    return this.clientRepository.findAndCount({
      skip: page,
      take: 10,
    });
  }

  public async create({
    name,
    email,
    telephone,
    cpf,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.clientRepository.create({
      name,
      email,
      telephone,
      cpf,
    });

    await this.clientRepository.save(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    return this.clientRepository.save(client);
  }

  public async delete(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}

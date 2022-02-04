import { Client } from '@modules/clients/entities/Client';
import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';

export interface IClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  findAllByName(name: string): Promise<Client[]>;
  findByCPF(cpf: string): Promise<Client | undefined>;
  findAllPaginated(page: number): Promise<[Client[], number]>;
  create(data: ICreateClientDTO): Promise<Client>;
  save(client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}

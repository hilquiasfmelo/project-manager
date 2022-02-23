import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';

import { Project } from '@modules/projects/entities/Project';
import { ProjectStatus } from '@modules/projects/enums/ProjectStatus';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  client_id: string;
  logo: string;
  description: string;
}

export class CreateProjectService {
  private projectRepository: IProjectRepository;
  private clientRepository: IClientRepository;

  constructor(
    projectRepository: ProjectRepository,
    clientRepository: ClientRepository,
  ) {
    this.projectRepository = projectRepository;
    this.clientRepository = clientRepository;
  }

  async execute({
    name,
    client_id,
    logo,
    description,
  }: IRequest): Promise<Project> {
    // Verifica se o client existe
    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not exists.');
    }

    const project = await this.projectRepository.create({
      name,
      client_id,
      status: ProjectStatus.NEW,
      logo,
      description,
    });

    return project;
  }
}

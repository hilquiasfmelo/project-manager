import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';

import { Project } from '@modules/projects/entities/Project';
import { ProjectStatus } from '@modules/projects/enums/ProjectStatus';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';

import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';

interface IRequest {
  name: string;
  client_id: string;
  user_id: string;
  logo?: string | undefined;
  description: string;
}

export class CreateProjectService {
  private projectRepository: IProjectRepository;
  private clientRepository: IClientRepository;
  private userRepository: IUserRepository;

  constructor(
    projectRepository: ProjectRepository,
    clientRepository: ClientRepository,
    userRepository: IUserRepository,
  ) {
    this.projectRepository = projectRepository;
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
  }

  async execute({
    name,
    client_id,
    user_id,
    logo,
    description,
  }: IRequest): Promise<Project> {
    // Verifica se o client existe
    const verifyClient = await this.clientRepository.findById(client_id);
    const verifyUser = await this.userRepository.findById(user_id);

    if (!verifyClient) {
      throw new AppError('Client not exists.');
    }

    if (!verifyUser) {
      throw new AppError('User not exists.');
    }

    const project = await this.projectRepository.create({
      name,
      client_id,
      user_id,
      status: ProjectStatus.NEW,
      logo,
      description,
    });

    return project;
  }
}

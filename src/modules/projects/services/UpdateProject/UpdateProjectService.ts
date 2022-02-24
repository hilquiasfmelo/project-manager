import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { Project } from '@modules/projects/entities/Project';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequestUpdate {
  id: string;
  name: string;
  client_id: string;
  logo: string;
  description: string;
}

export class UpdateProjectService {
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
    id,
    name,
    client_id,
    logo,
    description,
  }: IRequestUpdate): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not exists.');
    }

    Object.assign(project, {
      name,
      client_id,
      logo,
      description,
    });

    const updatedProject = await this.projectRepository.save(project);

    return updatedProject;
  }
}

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { IClientRepository } from '@modules/clients/repositories/interfaces/IClientRepository';
import { Project } from '@modules/projects/entities/Project';
import { ProjectStatus } from '@modules/projects/enums/ProjectStatus';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequestUpdate {
  id: string;
  status: ProjectStatus;
}

export class UpdateProjectStatusService {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute({ id, status }: IRequestUpdate): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    Object.assign(project, {
      status,
    });

    const updatedProject = await this.projectRepository.save(project);

    return updatedProject;
  }
}

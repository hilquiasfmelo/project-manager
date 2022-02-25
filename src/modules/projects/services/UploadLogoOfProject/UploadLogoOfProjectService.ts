import { Project } from '@modules/projects/entities/Project';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  logo?: string;
}

export class UploadLogoOfProjectService {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute({ id, logo }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not exists.');
    }

    Object.assign(project, {
      logo,
    });

    await this.projectRepository.save(project);

    return project;
  }
}

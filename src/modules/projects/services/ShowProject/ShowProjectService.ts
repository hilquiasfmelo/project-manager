import { Project } from '@modules/projects/entities/Project';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';
import { AppError } from '@shared/errors/AppError';

export class ShowProjectService {
  private projectsRepository: IProjectRepository;

  constructor(projectsRepository: IProjectRepository) {
    this.projectsRepository = projectsRepository;
  }

  async execute(id: string): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    return project;
  }
}

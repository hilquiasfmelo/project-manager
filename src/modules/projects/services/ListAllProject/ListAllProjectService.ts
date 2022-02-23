import { Project } from '@modules/projects/entities/Project';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';

export class ListAllProjectService {
  private projectsRepository: IProjectRepository;

  constructor(projectsRepository: IProjectRepository) {
    this.projectsRepository = projectsRepository;
  }

  async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.findAll();

    return projects;
  }
}

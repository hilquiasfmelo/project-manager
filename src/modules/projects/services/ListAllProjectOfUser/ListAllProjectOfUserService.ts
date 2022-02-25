import { Project } from '@modules/projects/entities/Project';
import { IProjectRepository } from '@modules/projects/repositories/interfaces/IProjectRepository';

export class ListAllProjectOfUserService {
  private projectsRepository: IProjectRepository;

  constructor(projectsRepository: IProjectRepository) {
    this.projectsRepository = projectsRepository;
  }

  async execute(user_id: string): Promise<Project[]> {
    const projects = await this.projectsRepository.findAllOfUser(user_id);

    return projects;
  }
}

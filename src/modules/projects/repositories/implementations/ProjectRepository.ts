import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { Project } from '@modules/projects/entities/Project';
import { getRepository, Repository } from 'typeorm';
import { IProjectRepository } from '../interfaces/IProjectRepository';

export class ProjectRepository implements IProjectRepository {
  private projectsRepository: Repository<Project>;

  constructor() {
    this.projectsRepository = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  public async findById(id: string): Promise<Project | undefined> {
    throw new Error('Method not implemented.');
  }
  public async create(data: ICreateProjectDTO): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  public async save(project: Project): Promise<Project> {
    throw new Error('Method not implemented.');
  }
}

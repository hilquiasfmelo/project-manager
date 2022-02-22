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
    return this.projectsRepository.find({
      // Retorna o cliente dos projetos
      relations: ['client'],
    });
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.projectsRepository.findOne(id, {
      relations: ['client'],
    });

    return project;
  }

  public async create({
    name,
    client_id,
    status,
    logo,
    description,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.projectsRepository.create({
      name,
      client_id,
      status,
      logo,
      description,
    });

    await this.projectsRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.projectsRepository.save(project);
  }
}

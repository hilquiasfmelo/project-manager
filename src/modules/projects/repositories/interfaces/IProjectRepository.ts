import { ICreateProjectDTO } from '@modules/projects/dtos/ICreateProjectDTO';
import { Project } from '@modules/projects/entities/Project';

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findAllOfUser(user_id: string): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
}

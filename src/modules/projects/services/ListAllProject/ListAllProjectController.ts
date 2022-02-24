import { Request, Response } from 'express';

import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { ListAllProjectService } from './ListAllProjectService';

export class ListAllProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const projectRepository = new ProjectRepository();

    const listAllProjectService = new ListAllProjectService(projectRepository);

    const projects = await listAllProjectService.execute();

    return response.status(200).json(projects);
  }
}

import { Request, Response } from 'express';

import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { ShowProjectService } from './ShowProjectService';

export class ShowProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const projectRepository = new ProjectRepository();

    const showProjectService = new ShowProjectService(projectRepository);

    const project = await showProjectService.execute(id);

    return response.status(200).json(project);
  }
}

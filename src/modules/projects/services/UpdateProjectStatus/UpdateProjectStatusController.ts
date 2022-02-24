import { Request, Response } from 'express';

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { UpdateProjectStatusService } from './UpdateProjectStatusService';

export class UpdateProjectStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;

    const projectRepository = new ProjectRepository();

    const updateProjectService = new UpdateProjectStatusService(
      projectRepository,
    );

    const updatedProject = await updateProjectService.execute({
      id,
      status,
    });

    return response.status(201).json(updatedProject);
  }
}

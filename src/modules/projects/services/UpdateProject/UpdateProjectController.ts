import { Request, Response } from 'express';

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { UpdateProjectService } from './UpdateProjectService';

export class UpdateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, client_id, logo, description } = request.body;

    const projectRepository = new ProjectRepository();
    const clientRepository = new ClientRepository();

    const updateProjectService = new UpdateProjectService(
      projectRepository,
      clientRepository,
    );

    const updatedProject = await updateProjectService.execute({
      id,
      name,
      client_id,
      logo,
      description,
    });

    return response.status(201).json(updatedProject);
  }
}

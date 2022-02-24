import { Request, Response } from 'express';

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { CreateProjectService } from './CreateProjectService';

export class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, client_id, logo, description } = request.body;

    const projectRepository = new ProjectRepository();
    const clientRepository = new ClientRepository();

    const createProjectService = new CreateProjectService(
      projectRepository,
      clientRepository,
    );

    const project = await createProjectService.execute({
      name,
      client_id,
      logo,
      description,
    });

    return response.status(201).json(project);
  }
}
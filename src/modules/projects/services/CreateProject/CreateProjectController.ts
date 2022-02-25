import { Request, Response } from 'express';

import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { CreateProjectService } from './CreateProjectService';

export class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, client_id, user_id, description } = request.body;
    const logo = request.file?.filename;

    const projectRepository = new ProjectRepository();
    const clientRepository = new ClientRepository();
    const userRepository = new UserRepository();

    const createProjectService = new CreateProjectService(
      projectRepository,
      clientRepository,
      userRepository,
    );

    const project = await createProjectService.execute({
      name,
      client_id,
      user_id,
      logo,
      description,
    });

    return response.status(201).json(project);
  }
}

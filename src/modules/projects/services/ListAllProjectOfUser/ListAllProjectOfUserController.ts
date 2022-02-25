import { Request, Response } from 'express';

import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { ListAllProjectOfUserService } from './ListAllProjectOfUserService';

export class ListAllProjectOfUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const projectRepository = new ProjectRepository();

    const listAllProjectOfUserService = new ListAllProjectOfUserService(
      projectRepository,
    );

    const projects = await listAllProjectOfUserService.execute(user_id);

    return response.status(200).json(projects);
  }
}

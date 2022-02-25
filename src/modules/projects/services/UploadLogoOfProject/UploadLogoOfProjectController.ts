import { Request, Response } from 'express';

import { ProjectRepository } from '@modules/projects/repositories/implementations/ProjectRepository';
import { UploadLogoOfProjectService } from './UploadLogoOfProjectService';

export class UploadLogoOfProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const logo = request.file?.filename;

    const projectRepository = new ProjectRepository();

    const uploadLogoOfProjectService = new UploadLogoOfProjectService(
      projectRepository,
    );

    const project = await uploadLogoOfProjectService.execute({
      id,
      logo,
    });

    return response.status(201).json(project);
  }
}

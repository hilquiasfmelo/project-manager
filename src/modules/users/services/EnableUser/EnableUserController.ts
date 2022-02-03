import { Request, Response } from 'express';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { instanceToInstance } from 'class-transformer';
import { EnableUserService } from './EnableUserService';

export class EnableUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRepository = new UserRepository();

    const enableUserService = new EnableUserService(userRepository);

    const user = await enableUserService.execute({ id });

    return response.status(200).json(instanceToInstance(user));
  }
}

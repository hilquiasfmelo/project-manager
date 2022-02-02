import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { CreateSessionService } from './CreateSessionService';

export class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();

    const createSessionService = new CreateSessionService(userRepository);

    const user = await createSessionService.execute({
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}

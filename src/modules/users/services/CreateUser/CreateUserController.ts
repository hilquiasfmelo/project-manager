import { Request, Response } from 'express';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { instanceToInstance } from 'class-transformer';
import { CreateUserService } from './CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();

    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}

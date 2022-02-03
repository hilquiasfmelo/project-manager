import { User } from '@modules/users/entities/User';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class EnableUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found. Please try again.', 404);
    }

    // Change user active state
    user.active = !user.active;

    // Save the new updated user
    await this.userRepository.save(user);

    return user;
  }
}

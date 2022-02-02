import { User } from '@modules/users/entities/User';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 4);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

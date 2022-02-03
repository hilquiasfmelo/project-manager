import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { instanceToInstance } from 'class-transformer';

import { User } from '@modules/users/entities/User';
import { UserRepository } from '@modules/users/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class CreateSessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    // Verify if user is already exists
    if (!user) {
      throw new AppError('Email or password incorrect. Please try again.', 401);
    }

    const passwordMatch = await compare(password, user.password);

    // Verify if the password match
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect. Please try again.', 401);
    }

    // Verify if the user is active
    if (!user.active) {
      throw new AppError('User is not active. Please try again.', 401);
    }

    // Create Token JWT
    const token = sign({}, String(process.env.JWT_SECRET_KEY), {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

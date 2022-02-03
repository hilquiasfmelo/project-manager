import { getRepository, Repository } from 'typeorm';
import { User } from '@modules/users/entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({ name, email, password });

    await this.usersRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}

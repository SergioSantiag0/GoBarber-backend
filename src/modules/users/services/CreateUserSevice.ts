import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User'

import IUserRepository from '../repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used.", 400)
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidadePrefix('providers-list')

    return user;
  }
}

export default CreateUserService;

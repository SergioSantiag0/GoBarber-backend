import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const reponse = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(reponse).toHaveProperty('token');
    expect(reponse.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })


    await expect(authenticateUser.execute({
      email: 'john@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  });
});

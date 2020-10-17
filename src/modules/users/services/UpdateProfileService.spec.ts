import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    const updated_user = await updateProfileService.execute({
      user_id: user.id,
      name: 'John tree',
      email: 'john@example.com'
    });

    expect(updated_user.name).toBe('John tree');
  });

  it('Should not be able update the profile from non-existing user', async () => {
    expect(updateProfileService.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'text@example.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to change the email another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456',
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    const updated_user = await updateProfileService.execute({
      user_id: user.id,
      name: 'John tree',
      email: 'john@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updated_user.password).toBe('123123');
  })

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John tree',
      email: 'john@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John tree',
      email: 'john@example.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)
  })
})


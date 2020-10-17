import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppontmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointment: CreateAppointmentService;
  let fakeNotificationsRepository: FakeNotificationsRepository;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user',
      provider_id: 'provider',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider')
  })


  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 12, 10, 15)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to create an appointment with same use as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 10, 13),
        user_id: 'user',
        provider_id: 'user',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to create an appointment before 8am after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 11, 7),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 11, 18),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

});


import { env } from '../config/environment.config';

export const testData = {
  authentication: {
    valid: {
      username: env.testUser,
      password: env.testPassword,
    },
    invalid: {
      username: 'invalid_user',
      password: 'invalid_password',
    },
  },
  booking: {
    existing: {
      id: 1,
      firstname: 'Sally',
      lastname: 'Brown',
      bookingdates: {
        checkin: '2013-02-23',
        checkout: '2014-10-23',
      },
    },
  },
  waitTimes: {
    short: 5_000,
    medium: 10_000,
    long: 30_000,
  },
} as const;

export type TestData = typeof testData;

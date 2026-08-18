import { env } from '../config/environment.config';

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
};

export function buildBookingPayload(): BookingPayload {
  return {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };
}

export function buildUpdatedBookingPayload(): BookingPayload {
  return {
    firstname: 'Juan Manuel',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };
}

export const validAuthData = {
  username: env.testUser,
  password: env.testPassword,
};

export const invalidAuthData = {
  username: 'invalid_user',
  password: 'invalid_password',
};

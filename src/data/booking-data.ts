import { env } from '../config/env.config';

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
export const authDataValida = {
  username: env.testUser,
  password: env.testPassword,
};

// Payload con credenciales incorrectas (para probar un caso negativo despues)
export const authDataInvalida = {
  username: 'usuario_falso',
  password: 'password_incorrecto',
};

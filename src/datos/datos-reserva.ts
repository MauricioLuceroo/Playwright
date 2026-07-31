import { entorno } from '../configuracion/entorno.config';

export type ReservaPayload = {
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

export function construirCargaReserva(): ReservaPayload {
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
export function actualizarDatosReserva(): ReservaPayload {
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

export const datosAuthValida = {
  username: entorno.usuarioPrueba,
  password: entorno.contrasenaPrueba,
};

// Payload con credenciales incorrectas (para probar un caso negativo después)
export const datosAuthInvalida = {
  username: 'usuario_falso',
  password: 'password_incorrecto',
};

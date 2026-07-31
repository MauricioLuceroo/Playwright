import { entorno } from '../configuracion/entorno.config';

export const datosPrueba = {
  autenticacion: {
    valido: {
      username: entorno.usuarioPrueba,
      password: entorno.contrasenaPrueba,
    },
    invalido: {
      username: 'usuario_falso',
      password: 'password_incorrecto',
    },
  },
  reserva: {
    existente: {
      id: 1,
      firstname: 'Sally',
      lastname: 'Brown',
      bookingdates: {
        checkin: '2013-02-23',
        checkout: '2014-10-23',
      },
    },
  },
  tiemposDeEspera: {
    corto: 5_000,
    medio: 10_000,
    largo: 30_000,
  },
} as const;

export type DatosPrueba = typeof datosPrueba;

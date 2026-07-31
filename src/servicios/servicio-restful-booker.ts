import { APIRequestContext } from '@playwright/test';
import { entorno } from '../configuracion/entorno.config';

type CredencialesAutenticacion = {
  username: string;
  password: string;
};

type ParametrosBusquedaReserva = {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
};

export class ServicioRestfulBooker {
  constructor(private readonly request: APIRequestContext) {}

  private readonly urlBase = entorno.urlBaseRestfulBooker;

  async verificarEstado() {
    return this.request.get(`${this.urlBase}/ping`);
  }

  async iniciarSesion(credentials: CredencialesAutenticacion) {
    return this.request.post(`${this.urlBase}/auth`, {
      data: credentials,
    });
  }

  async crearReserva(payload: Record<string, unknown>) {
    return this.request.post(`${this.urlBase}/booking`, {
      data: payload,
    });
  }

  async obtenerTodasLasReservas() {
    return this.request.get(`${this.urlBase}/booking`);
  }

  async obtenerIdReserva(searchParams: ParametrosBusquedaReserva) {
    return this.request.get(`${this.urlBase}/booking`, {
      params: searchParams,
    });
  }

  async obtenerReserva(bookingId: number) {
    return this.request.get(`${this.urlBase}/booking/${bookingId}`);
  }

  async actualizarReserva(bookingId: number, payload: Record<string, unknown>, token: string) {
    return this.request.put(`${this.urlBase}/booking/${bookingId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    });
  }

  async eliminarReserva(bookingId: number, token: string) {
    return this.request.delete(`${this.urlBase}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    });
  }
}

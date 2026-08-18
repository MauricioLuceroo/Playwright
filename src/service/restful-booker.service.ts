import { APIRequestContext } from '@playwright/test';
import { env } from '../config/environment.config';

type AuthCredentials = {
  username: string;
  password: string;
};

type BookingSearchParams = {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
};

export class RestfulBookerService {
  constructor(private readonly request: APIRequestContext) {}

  private readonly baseUrl = env.restfulBookerBaseUrl;

  async checkHealth() {
    return this.request.get(`${this.baseUrl}/ping`);
  }

  async login(credentials: AuthCredentials) {
    return this.request.post(`${this.baseUrl}/auth`, {
      data: credentials,
    });
  }

  async createBooking(payload: Record<string, unknown>) {
    return this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
    });
  }

  async getAllBookings() {
    return this.request.get(`${this.baseUrl}/booking`);
  }

  async searchBookingIds(searchParams: BookingSearchParams) {
    return this.request.get(`${this.baseUrl}/booking`, {
      params: searchParams,
    });
  }

  async getBooking(bookingId: number) {
    return this.request.get(`${this.baseUrl}/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, payload: Record<string, unknown>, token: string) {
    return this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    });
  }

  async deleteBooking(bookingId: number, token: string) {
    return this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    });
  }
}

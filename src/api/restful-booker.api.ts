import { APIRequestContext } from '@playwright/test';
import { env } from '../config/env.config';

export class RestfulBookerApi {
  constructor(private readonly request: APIRequestContext) {}

  private readonly baseUrl = env.restfulBookerBaseUrl;

  async healthCheck() {
    return this.request.get(`${this.baseUrl}/ping`);
  }

  async login() {
    return this.request.post(`${this.baseUrl}/auth`, {
      data: {
        username: env.testUser,
        password: env.testPassword,
      },
    });
  }

  async createBooking(payload: Record<string, unknown>) {
    return this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
    });
  }
}

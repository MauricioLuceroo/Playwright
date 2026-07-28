import { test, expect } from '../fixtures/test.fixture';
import { buildBookingPayload } from '../../src/data/booking-data';

test.describe('Restful Booker API', () => {
  test('GET /ping devuelve 201', async ({ restfulBookerApi }) => {
    const response = await restfulBookerApi.healthCheck();
    expect(response.status()).toBe(201);
  });

  test('POST /auth devuelve un token', async ({ restfulBookerApi }) => {
    const response = await restfulBookerApi.login();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });

  test('POST /booking crea una reserva', async ({ restfulBookerApi }) => {
    const payload = buildBookingPayload();
    const response = await restfulBookerApi.createBooking(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.booking).toMatchObject(payload);
  });
});

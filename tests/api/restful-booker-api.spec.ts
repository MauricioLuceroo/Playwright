import { test, expect } from '../fixtures/api.fixture';
import { testData } from '../../src/data/test-data';
import { buildUpdatedBookingPayload, buildBookingPayload } from '../../src/data/booking-data';

test.describe.configure({ mode: 'serial' });

let authToken = '';

test.describe('API Restful Booker', () => {
  test.beforeAll(async ({ restfulBookerService }) => {
    const response = await restfulBookerService.login(testData.authentication.valid);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');

    authToken = body.token;
  });

  test('GET /ping returns 201', async ({ restfulBookerService }) => {
    const response = await restfulBookerService.checkHealth();
    expect(response.status()).toBe(201);
  });

  test('POST /auth returns a token', async ({ restfulBookerService }) => {
    const response = await restfulBookerService.login(testData.authentication.valid);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');

    authToken = body.token;
    expect(authToken).toBeTruthy();
  });

  test('POST /booking creates a booking', async ({ restfulBookerService }) => {
    const payload = buildBookingPayload();
    const response = await restfulBookerService.createBooking(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.booking).toMatchObject(payload);
  });

  test('GET /booking returns booking IDs for all bookings', async ({ restfulBookerService }) => {
    const response = await restfulBookerService.getAllBookings();

    expect(response.status()).toBe(200);

    const searchBody = await response.json();

    expect(Array.isArray(searchBody)).toBe(true);
    const bookingId = searchBody[0]?.bookingid;
    expect(bookingId).toBeDefined();
  });

  test('GET /booking filters return booking IDs for the requested criteria', async ({
    restfulBookerService,
  }) => {
    const bookingToFilter = buildBookingPayload();
    const creationResponse = await restfulBookerService.createBooking(bookingToFilter);
    expect(creationResponse.status()).toBe(200);

    const creationBody = await creationResponse.json();
    expect(creationBody.bookingid).toBeDefined();

    const searchFilters = {
      firstname: bookingToFilter.firstname,
      lastname: bookingToFilter.lastname,
    };
    const response = await restfulBookerService.searchBookingIds(searchFilters);

    expect(response.status()).toBe(200);

    const searchBody: Array<{ bookingid: number }> = await response.json();

    expect(Array.isArray(searchBody)).toBe(true);
    expect(searchBody.length).toBeGreaterThan(0);
    expect(searchBody.some((booking) => booking.bookingid === creationBody.bookingid)).toBe(
      true,
    );
  });

  test('PUT /booking/{id} updates an existing booking', async ({ restfulBookerService }) => {
    const bookingToUpdate = buildBookingPayload();
    const creationResponse = await restfulBookerService.createBooking(bookingToUpdate);
    expect(creationResponse.status()).toBe(200);

    const creationBody = await creationResponse.json();
    expect(creationBody.bookingid).toBeDefined();

    const updatedBooking = buildUpdatedBookingPayload();
    const response = await restfulBookerService.updateBooking(
      creationBody.bookingid,
      updatedBooking,
      authToken,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(updatedBooking);
  });

  test('DELETE /booking/{id} deletes an existing booking', async ({ restfulBookerService }) => {
    const bookingToDelete = buildBookingPayload();
    const creationResponse = await restfulBookerService.createBooking(bookingToDelete);
    expect(creationResponse.status()).toBe(200);

    const creationBody = await creationResponse.json();
    expect(creationBody.bookingid).toBeDefined();

    const response = await restfulBookerService.deleteBooking(creationBody.bookingid, authToken);
    expect(response.status()).toBe(201);
  });
});

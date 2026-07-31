import { prueba as test, expect } from '../recursos/fixture.prueba';
import { datosPrueba } from '../../src/datos/datos-prueba';
import { actualizarDatosReserva, construirCargaReserva } from '../../src/datos/datos-reserva';

test.describe.configure({ mode: 'serial' });

let tokenAutenticacion = '';

test.describe('API Restful Booker', () => {
  test.beforeAll(async ({ servicioRestfulBooker }) => {
    const response = await servicioRestfulBooker.iniciarSesion(datosPrueba.autenticacion.valido);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');

    tokenAutenticacion = body.token;
  });
  test('GET /ping devuelve 201', async ({ servicioRestfulBooker }) => {
    const response = await servicioRestfulBooker.verificarEstado();
    expect(response.status()).toBe(201);
  });

  test('POST /auth devuelve un token', async ({ servicioRestfulBooker }) => {
    const response = await servicioRestfulBooker.iniciarSesion(datosPrueba.autenticacion.valido);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');

    tokenAutenticacion = body.token;
    expect(tokenAutenticacion).toBeTruthy();

    // eslint-disable-next-line no-undef
    console.log('Respuesta del servidor:', body);
  });

  test('POST /booking crea una reserva', async ({ servicioRestfulBooker }) => {
    const payload = construirCargaReserva();
    const response = await servicioRestfulBooker.crearReserva(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.booking).toMatchObject(payload);
  });

  test('GET /booking (search) devuelve  bookingid(s) de todas las reservas', async ({
    servicioRestfulBooker,
  }) => {
    const response = await servicioRestfulBooker.obtenerTodasLasReservas();

    expect(response.status()).toBe(200);

    const cuerpoBusqueda = await response.json();
    // eslint-disable-next-line no-undef
    console.log('Respuesta del servidor:', cuerpoBusqueda);

    expect(Array.isArray(cuerpoBusqueda)).toBe(true);
    const idReserva = cuerpoBusqueda[0]?.bookingid;
    expect(idReserva).toBeDefined();
  });

  test('GET /booking filters devuelve bookingid(s) para criterios filtados', async ({
    servicioRestfulBooker,
  }) => {
    const reservaParaFiltrar = construirCargaReserva();
    const respuestaCreacion = await servicioRestfulBooker.crearReserva(reservaParaFiltrar);
    expect(respuestaCreacion.status()).toBe(200);

    const cuerpoCreacion = await respuestaCreacion.json();
    expect(cuerpoCreacion.bookingid).toBeDefined();

    const filtrosBusqueda = {
      firstname: reservaParaFiltrar.firstname,
      lastname: reservaParaFiltrar.lastname,
    };
    const response = await servicioRestfulBooker.obtenerIdReserva(filtrosBusqueda);

    expect(response.status()).toBe(200);

    const cuerpoBusqueda: Array<{ bookingid: number }> = await response.json();
    // eslint-disable-next-line no-undef
    console.log('Respuesta del servidor:', JSON.stringify(cuerpoBusqueda, null, 2));

    expect(Array.isArray(cuerpoBusqueda)).toBe(true);
    expect(cuerpoBusqueda.length).toBeGreaterThan(0);
    expect(cuerpoBusqueda.some((reserva) => reserva.bookingid === cuerpoCreacion.bookingid)).toBe(
      true,
    );
  });

  test('PUT /booking/{id} actualiza una reserva existente', async ({ servicioRestfulBooker }) => {
    const reservaParaActualizar = construirCargaReserva();
    const respuestaCreacion = await servicioRestfulBooker.crearReserva(reservaParaActualizar);
    expect(respuestaCreacion.status()).toBe(200);

    const cuerpoCreacion = await respuestaCreacion.json();
    expect(cuerpoCreacion.bookingid).toBeDefined();

    const actualizacion = actualizarDatosReserva();
    const response = await servicioRestfulBooker.actualizarReserva(
      cuerpoCreacion.bookingid,
      actualizacion,
      tokenAutenticacion,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(actualizacion);
  });

  test('DELETE /booking/{id} elimina una reserva existente', async ({ servicioRestfulBooker }) => {
    const reservaParaEliminar = construirCargaReserva();
    const respuestaCreacion = await servicioRestfulBooker.crearReserva(reservaParaEliminar);
    expect(respuestaCreacion.status()).toBe(200);

    const cuerpoCreacion = await respuestaCreacion.json();
    expect(cuerpoCreacion.bookingid).toBeDefined();

    const response = await servicioRestfulBooker.eliminarReserva(
      cuerpoCreacion.bookingid,
      tokenAutenticacion,
    );
    expect(response.status()).toBe(201);
  });
});

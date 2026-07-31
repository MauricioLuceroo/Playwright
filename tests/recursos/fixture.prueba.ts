import { test as base } from '@playwright/test';
import { ServicioRestfulBooker } from '../../src/servicios/servicio-restful-booker';

type FixturePruebas = {
  servicioRestfulBooker: ServicioRestfulBooker;
};

/**
 * Fixture personalizado que inyecta el cliente de API de Restful Booker.
 */
export const prueba = base.extend<FixturePruebas>({
  servicioRestfulBooker: async ({ request }, use) => {
    const servicio = new ServicioRestfulBooker(request);
    await use(servicio);
  },
});

export { expect } from '@playwright/test';

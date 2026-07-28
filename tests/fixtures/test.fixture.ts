import { test as base } from '@playwright/test';
import { RestfulBookerApi } from '../../src/api/restful-booker.api';

type TestFixtures = {
  restfulBookerApi: RestfulBookerApi;
};

/**
 * Fixture personalizado que inyecta el cliente de API de Restful Booker.
 */
export const test = base.extend<TestFixtures>({
  restfulBookerApi: async ({ request }, use) => {
    const api = new RestfulBookerApi(request);
    await use(api);
  },
});

export { expect } from '@playwright/test';

import { test as base } from '@playwright/test';
import { RestfulBookerService } from '../../src/service/restful-booker.service';

type TestFixtures = {
  restfulBookerService: RestfulBookerService;
};

export const test = base.extend<TestFixtures>({
  restfulBookerService: async ({ request }, use) => {
    const service = new RestfulBookerService(request);
    await use(service);
  },
});

export { expect } from '@playwright/test';

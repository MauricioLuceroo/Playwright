import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  restfulBookerBaseUrl:
    process.env.RESTFUL_BOOKER_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  testUser: process.env.TEST_USER ?? 'admin',
  testPassword: process.env.TEST_PASSWORD ?? 'password123',
  isCI: !!process.env.CI,
} as const;

export type EnvironmentConfig = typeof env;

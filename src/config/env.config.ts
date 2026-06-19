import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://playwright.dev',
  testUser: process.env.TEST_USER ?? '',
  testPassword: process.env.TEST_PASSWORD ?? '',
  isCI: !!process.env.CI,
} as const;

export type EnvConfig = typeof env;

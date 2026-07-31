import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const entorno = {
  urlBaseRestfulBooker:
    process.env.RESTFUL_BOOKER_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  usuarioPrueba: process.env.TEST_USER ?? 'admin',
  contrasenaPrueba: process.env.TEST_PASSWORD ?? 'password123',
  esCI: !!process.env.CI,
} as const;

export type ConfigEntorno = typeof entorno;

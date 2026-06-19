export const testData = {
  timeouts: {
    short: 5_000,
    medium: 10_000,
    long: 30_000,
  },
} as const;

export type TestData = typeof testData;

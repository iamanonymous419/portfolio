// jest.config.ts
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',

  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/coverage/', '/e2e/'],

  // 👇 Required for SonarCloud
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov' as const, 'text' as const],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/__tests__/',
    '/pages/_app.tsx',
    '/pages/_document.tsx',
  ],
};

export default createJestConfig(customJestConfig);

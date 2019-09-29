module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/__test__/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!configurations/**',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary', 'html'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
};

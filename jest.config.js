module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*Container.tsx',
    '!src/**/*Index.tsx',
    '!src/**/*.service.{tsx,ts}',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '^app(.*)$': '<rootDir>/src/app$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^packages(.*)$': '<rootDir>/src/packages$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  resolver: 'jest-pnp-resolver',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)spec.{js,ts,tsx}'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|ts|tsx)$',
    '^.+\\.module\\.(css|scss)$',
  ],
}

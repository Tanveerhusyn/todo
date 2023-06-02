module.exports = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
      NODE_ENV: 'test',
    },
    testTimeout: 200000,
    restoreMocks: true,
    coveragePathIgnorePatterns: ['node_modules', 'config', 'app.js', 'tests'],
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
  };
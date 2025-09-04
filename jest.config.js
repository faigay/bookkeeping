module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
  ,testPathIgnorePatterns: [
    '<rootDir>/bookkeeping/frontend/bookkeeping-frontend/src/app/app.spec.ts',
    '<rootDir>/src/tests/',
    '<rootDir>/bookkeeping/src/tests/'
  ]
};

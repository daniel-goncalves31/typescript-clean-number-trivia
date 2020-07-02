module.exports = {
  rootDir: 'src',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '$1'
  },
  preset: 'ts-jest'

}

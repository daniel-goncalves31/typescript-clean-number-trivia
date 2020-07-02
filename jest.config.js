module.exports = {
  rootDir: '.',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': 'src/$1'
  },
  preset: 'ts-jest'

}

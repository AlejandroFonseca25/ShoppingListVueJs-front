module.exports = {
  roots: ['<rootDir>/src/test/component'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'vue'],
  transform: {
    "^.+\\.js$": "babel-jest",
    '^.+\\.vue$': 'vue-jest',
  },
}

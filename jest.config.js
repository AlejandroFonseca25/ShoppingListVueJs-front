module.exports = {
  roots: ['<rootDir>/src/test'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'vue'],
  transform: {
    "^.+\\.js$": "babel-jest",
    '^.+\\.vue$': 'vue-jest',
  },
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/path/to/setup.js"]
  }
}

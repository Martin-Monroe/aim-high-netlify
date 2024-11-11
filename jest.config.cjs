module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
};

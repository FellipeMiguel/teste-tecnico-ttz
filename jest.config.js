module.exports = {
  transform: {
    "^.+\\.jsx?$": ["@swc/jest"],
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

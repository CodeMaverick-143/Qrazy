export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["./tests/setup.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

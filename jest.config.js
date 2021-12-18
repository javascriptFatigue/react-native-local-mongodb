module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: '(spec|test)\\.tsx?$',
  "moduleNameMapper": {
    "react-native": "<rootDir>/config/jest/reactNativeMock.js"
  },
};

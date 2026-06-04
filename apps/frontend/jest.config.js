/** @type {import('ts-jest').JestConfigWithTsJest} **/
const path = require('path');

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^react$": path.resolve(__dirname, '../../node_modules/react'),
    "^react-dom$": path.resolve(__dirname, '../../node_modules/react-dom'),
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  preset: 'ts-jest',
  moduleFileExtensions : ["ts","js"],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};
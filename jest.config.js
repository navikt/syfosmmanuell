module.exports = {
    "roots": [
      "./src/tests"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupFilesAfterEnv": ['./setupJest.ts']
  }
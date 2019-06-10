module.exports = {
  roots: ["<rootDir>/server", "<rootDir>/client"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  }
};

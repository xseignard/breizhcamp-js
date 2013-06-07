// minimal karma conf for dev mode
// base path, that will be used to resolve files and exclude
var basePath = '../';

// list of files / patterns to load in the browser
var files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  // test files
  'test/e2e/**/*.js'
];
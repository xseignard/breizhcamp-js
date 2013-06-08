// minimal karma conf for dev mode
// base path, that will be used to resolve files and exclude
var basePath = '../';

// list of files / patterns to load in the browser
var files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  // test files
  'test/e2e/**/*.spec.js'
];
var singleRun = true;
var browsers = ['Chrome'];
var runnerPort = 9101;
var port = 9877;
var proxies = {'/': 'http://localhost:8000/'};
var urlRoot = '/_karma/';
var reporters = ['junit'];
var junitReporter = {
	outputFile: 'reports/TEST-IT-xunit.xml'
};
// minimal karma conf for dev mode
// base path, that will be used to resolve files and exclude
var basePath = '../';

// list of files / patterns to load in the browser
var files = [
  // adapters to be loaded
  MOCHA,
  MOCHA_ADAPTER,
  // bower libs
  'bower_components/angular/index.js',
  'bower_components/jquery/jquery.js',
  'bower_components/angular-resource/index.js',
  'bower_components/angular-mocks/index.js',
  'bower_components/greensock/src/uncompressed/TweenMax.js',
  'bower_components/greensock/src/uncompressed/plugins/ScrollToPlugin.js',
  'bower_components/JavaScript-MD5/js/md5.js',
  'bower_components/chai/chai.js',
  // chai config file
  'test/chai.conf.js',
  // response mock
  'test/responses.mock.js',
  // app files
  'src/app/**/*.js',
  // template files included:false means files won't be loaded through script tag
  // but still accessible from karma server
  {pattern:'src/app/**/partials/*.tpl.html', included:false},
  // test files
  'test/unit/**/*.test.js'
];


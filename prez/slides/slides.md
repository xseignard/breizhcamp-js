title: Content

Javascript is everywhere !

Case study : `geektic`* written entirely in Javascript and powered by

- `Angular.js` for the frontend
- `Node.js` for the backend
- `MongoDB` for the NoSQL database

\* geektic was originaly developed by the code-story team for DevoxxFR 2013 (see [https://github.com/CodeStory/code-story-geektic](https://github.com/CodeStory/code-story-geektic))

---

title: Hands-on lab

4 main parts : 

- `MongoDB` : "NoSQL loves JSON"
- `Node.js` : "Server-side JS"
- `Angular.js` : "Superheroic Javascript MVW Framework"
- `grunt, make and co.` : "JS tooling is good !"

Exercises : 

- A Git repository with some code and todos
- One tag per exercise
- Reset your workspace with the following command ("n" is the exercise's number):

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-n
</pre>

---

title: Prerequisites - shell & make

- A command line tool!
- A `Make` tool
    - `make -v` must work

<pre class="prettyprint" data-lang="cmd">
make -v
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
</pre>

For windows users

- Git for windows comes with a command line tool (see next slide)
- For the make tool, you can install `mingw32-make`

---

title: Prerequisites - git

- Git : see [http://git-scm.com/](http://git-scm.com/)
    - `git --version` must work

<pre class="prettyprint" data-lang="cmd">
git --version
git version 1.7.9.5
</pre>

![git_logo](http://git-scm.com/images/logos/2color-lightbg@2x.png)

---

title: Prerequisites - node.js

- Node.js : see [http://nodejs.org/](http://nodejs.org/)
    - `node -v` and `npm -v` must work

<pre class="prettyprint" data-lang="cmd">
node -v
v0.10.7
</pre>

<pre class="prettyprint" data-lang="cmd">
npm -v
1.2.21
</pre>

![nodejs_logo](http://upload.wikimedia.org/wikipedia/en/a/a7/Nodejs_logo_light.png)

---

title: Prerequisites - mongodb

- MongoDB : see [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)
    - `mongo --version` must work

<pre class="prettyprint" data-lang="cmd">
mongo --version
MongoDB shell version: 2.2.4
</pre>

- Installation
    - Unzip the bundle
    - add the `bin` directory to your PATH

![mongodb_logo](http://shvetsgroup.com/files/images/mongo-db-huge-logo_0.png)

---

title: MongoDB
subtitle: NoSQL loves JSON
class: segue dark nobackground

---

title: Geek document

MongoDB is a document-oriented NoSQL database.

This kind of JSON documents will be inserted into the Mongo database : 

<pre class="prettyprint" data-lang="json">
{
    "firstname" : "Prunier",
    "lastname" : "Sébastien",
    "email" : "me@my-domain.com",
    "city" : "Nantes",
    "likes" : ["Javascript", "Breizhcamp"],
    "hates" : ["Rain"]
}
</pre>

---

title: Start mongod

Use the `--dbpath` argument to set the mongo data directory

<pre class="prettyprint" data-lang="cmd">
mongod --dbpath=/home/sebprunier/data/mongo/breizhcamp-js/
</pre>

Check the logs in the console

    ...
    Tue Jun  4 16:47:17 [websvr] admin web console waiting for connections on port 28017
    Tue Jun  4 16:47:17 [initandlisten] waiting for connections on port 27017


---

title: Mongo shell

Connect to the `geeksDB` database

<pre class="prettyprint" data-lang="cmd">
mongo geeksDB
</pre>

Great ! Here is the mongo shell !

    MongoDB shell version: 2.2.4
    connecting to: geeksDB
    > 

---

title: Insert geeks

Insert geeks into the `geeks` collection :

<pre class="prettyprint" data-lang="cmd">
db.geeks.insert({"firstname": "Prunier", "lastname": "Sébastien", 
        "email": "seb@domain.com", "city": "Nantes", 
        "likes" : ["java","javascript","breizhcamp"], "hates": ["fish"]})

db.geeks.insert({"firstname": "Seignard", "lastname": "Xavier", 
        "email": "xav@domain.com", "city": "Nantes", 
        "likes" : ["javascript","arduino","node.js"], "hates": ["scala", "idea"]})

db.geeks.insert({"firstname": "your first name", "lastname": "your last name", 
        "email": "your email", "city": "your city", 
        "likes" : ["things you like"], "hates": ["things you hate"]})
</pre>

---

title: Find a geek

Execute this query to find a geek :

<pre class="prettyprint" data-lang="cmd">
db.geeks.findOne()
</pre>

Results should look like :

<pre class="prettyprint" data-lang="json">
{
    "_id" : ObjectId("51ae04733579e9826523e0fb"),
    "firstname" : "Prunier",
    "lastname" : "Sébastien",
    "email" : "seb@domain.com",
    "city" : "Nantes",
    "likes" : ["java", "javascript", "breizhcamp"],
    "hates" : ["fish"]
}
</pre>

---

title: Find geeks 

Geeks that love javascript (ignoring case)

<pre class="prettyprint" data-lang="cmd">
db.geeks.find( { "likes" : /^javascript$/i } )
</pre>

First 3 geeks that love javascript
<pre class="prettyprint" data-lang="cmd">
db.geeks.find( { "likes" : /^javascript$/i } ).limit(3)
</pre>

3 geeks that love javascript, skiping the first one
<pre class="prettyprint" data-lang="cmd">
db.geeks.find( { "likes" : /^javascript$/i } ).limit(3).skip(1)
</pre>

---

title : Exercise 1

- Checkout the workspace for exercise 1

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-1
</pre>

- Play with the Mongo shell !
    - Insert geeks
    - Execute some `find` queries
    - Try to write a `find` query that uses a regular expression

---

title: Node.js
subtitle: JS on the server side
class: segue dark nobackground

---

title: Node.js

- Javascript on the server side !
- Single threaded
- Event-driven model
- Asynchronous I/O
- Google's V8 Javascript engine
- NPM : Node Packaged Modules

![nodejs_logo](http://upload.wikimedia.org/wikipedia/en/a/a7/Nodejs_logo_light.png)

---

title: "Hello World" with Node.js

Create a file named `hello.js`

<pre class="prettyprint" data-lang="javascript">
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8888, 'localhost');

console.log('Server running at http://localhost:8888/');
</pre>

Run the script

<pre class="prettyprint" data-lang="cmd">
node hello.js
</pre>

Test with your favorite browser (`http://localhost:8888/`) !

---

title: Node.js and MongoDB

Install the native driver with NPM (Node Packaged Modules)

- `npm install mongodb --save`
- the `--save` option adds the package in the `dependencies` section of the `package.json` file

<pre class="prettyprint" data-lang="json">
{
  "name": "breizhcamp-js_backend",
  "dependencies": {
    "mongodb": "~1.3.2",
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.2.x"
  }
}
</pre>

---

title: Connect to the Mongo Database

<pre class="prettyprint" data-lang="javascript">
var MongoClient = require('mongodb').MongoClient;

var uri = require('../conf/conf').MONGO_URL;

MongoClient.connect(uri, function(err, db) {
    // err : Error object, if an error occured
    // db : use this object to query the Mongo database !
}
</pre>

Configuration

<pre class="prettyprint" data-lang="javascript">
var Conf = {
    MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/geeksDB'
};

module.exports = Conf;
</pre>

---

title: Remove existing geeks ...

<pre class="prettyprint" data-lang="javascript">
db.collection('geeks', function(err, collection) {
    collection.remove({}, function(err, removed){
        console.log(removed + " geek(s) removed !");
    });
}
</pre>

With the Mongo shell : 

<pre class="prettyprint" data-lang="cmd">
db.geeks.remove({});
</pre>

---

title: Insert geeks !

Geeks are available in the `geeks.json` file

<pre class="prettyprint" data-lang="javascript">
var geeks = require('./geeks.json');

db.collection('geeks', function(err, collection) {
    collection.insert(geeks, {safe : true}, function(err, result) {
        console.log(result.length + " geek(s) inserted !");
    });
}
</pre>

`safe` : the callback is executed after the geeks are saved to the database

---

title : Exercise 2

- Checkout the workspace for exercise 2 : 

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-2
</pre>

- Write a script to populate the geeksDB database, from the `geeks.json` file.
- Check the script execution with the Mongo shell !

---

title: Exercise 2 - advanced features

- To go further : if you dive into the `callback hell` and do not like it, try `async` !

<pre class="prettyprint" data-lang="javascript">
async = require('async');
async.series(
    [
        // 1- remove geeks
        function(callback) {...};
        // 2- insert geeks
        function(callback) {...};
    ],
    function(err, results) {...}
);
</pre>

---

title: REST API for geeks backend

POST /geek

- Creates a new geek
- Returns the `201 - Created` status code

GET /geek/likes/:like?

- Find geeks by affinity
    - `like` is an optional path parameter. If not set, it returns all the geeks.
- Optional query parameters : 
    - `limit` : number of geeks to return (default 12)
    - `skip` : offset to manage pagination (default 0)

---

title: Hello world with Express.js 

<pre class="prettyprint" data-lang="javascript">
var express = require('express');
var app = express();

// configure routes
app.get('/hello', function(req, res){
  res.send('Hello World');
});

// start server
app.listen(3000);
console.log('Listening on port 3000');
</pre>

Run the script and make a test with your browser (`http://localhost:3000/hello`)

---

title: Separation Of Concerns (1/3)

One module for the routes management

<pre class="prettyprint" data-lang="javascript">
var GeeksRoutes = function(geeksRepo) {

    var _create = function(req, res) {
        geeksRepo.insert(req.body, function() {
            res.status(201).send();
        });
    };
    
    return {
        create : _create,
    };

};
module.exports = GeeksRoutes;
</pre>
---

title: Separation Of Concerns (2/3)

One module for the repository management

<pre class="prettyprint" data-lang="javascript">
var GeeksRepository = function(dbUrl, collectionName) {
    var MongoClient = require('mongodb'), db, coll;
    // some stuff here to connect to the database and retrieve the coll object.

    var _insert = function(geek, callback) {
        coll.insert(geek, function(err, item) {
            callback(err, item);
        });
    };

    return {
        insert : _insert,
    };
};
module.exports = GeeksRepository;
</pre>

---

title: Separation Of Concerns (3/3)

Put all together !

<pre class="prettyprint" data-lang="javascript">
var express = require('express'),
    conf = require('./conf/conf'),
    app = express(),
    GeeksRepository = require('./core/geeksRepository'),
    GeeksRoutes = require('./routes/geeksRoutes');

// configure geeks repository
var geeksRepository = new GeeksRepository(conf.MONGO_URL, 'geeks');
geeksRepository.connect();

// configure routes
var routes = new GeeksRoutes(geeksRepository);
app.post('/geek', routes.create);
</pre>

---

title: Unit tests with Mocha (TDD)

Tests for the routes, using some custom mock objects.

<pre class="prettyprint" data-lang="javascript">
var assert = require('assert'),
    GeeksRoutes = require('../../src/routes/geeksRoutes'),
    geeksRepository = require('../mocks/geeksRepository.mock'),
    Response = require('../mocks/response.mock'),
    routes = new GeeksRoutes(geeksRepository);

describe('GeeksRoutes', function() {
    describe('#create()', function() {
        it('should create geek', function() {
            var response = new Response();
            var req = { body : { "NOM" : "test-geek" } };
            routes.create(req, response);
            assert.equal(response.getStatus(), 201);
        });
    });
});

---

title: Tooling

- Mocha : Test Driven Development for Javascript

<pre class="prettyprint" data-lang="cmd">
mocha -R spec `find test/ -name "*.test.js"`
</pre>

- JSHint : static code analysis for Javascript

<pre class="prettyprint" data-lang="cmd">
jshint src test --show-non-errors
</pre>

- YuiDocs : generates code documentation

<pre class="prettyprint" data-lang="cmd">
yuidoc src -o reports/docs
</pre>

- Istanbul : code coverage

---

title: Exercise 3

- Checkout the workspace for exercise 3 : 

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-3
</pre>

- Write the code to manage the `find` route
- Complete the unit tests
- Execute the test with the Makefile
    - `make test`
- Run the app and test the REST API 
    - with your browser
    - with a tool to make http requests (curl for example)

---

title: Node.js good reads

Node.js overview :

- [http://nodejs.org/api/](http://nodejs.org/api/) RTFM FTW!
- [http://www.nodebeginner.org/](http://www.nodebeginner.org/)
- [http://visionmedia.github.io/masteringnode/book.html](http://visionmedia.github.io/masteringnode/book.html) by [TJ Holowaychuk](https://github.com/visionmedia/) (express & mocha creator)

Node.js good practices :

- [http://nodeguide.com/style.html](http://nodeguide.com/style.html) by [Felix Geisendörfer](https://github.com/felixge) (node.js core developer)
- [http://caolanmcmahon.com/posts/nodejs_style_and_structure/](http://caolanmcmahon.com/posts/nodejs_style_and_structure/) by Caolan McMahon (async creator)

---

title: Angular.js
subtitle: Superheroic Javascript Framework !
class: segue dark nobackground

---

title: Angular.js

- Superheroic Javascript Framework !
- Angular's Philosophy :
    - Declarative programming for UI (HTML)
    - Imperative programming for business logic (Javascript)
    - Two-way data binding
    - No DOM manipulation
    - HTML extension (directives)
    - Focus on application testing


![angular_logo](http://t3.gstatic.com/images?q=tbn:ANd9GcTZazTKcUtj-8Dsjj4ETOjeALpJ7JffXxWbYlQrmtWb3Y9qnhTyWW_y-b0IKg)

---

title: How to start ?

A solution : `Angular Seed` !

This is a skeleton for a typical AngularJS web app

- HTML template and views
- Controller
- Examples of code for directives, filters and services
- Unit tests and End-to-end tests

Clone the Github repository and start hacking ...

[https://github.com/angular/angular-seed](https://github.com/angular/angular-seed)

---

title: View and template

`app/index.html`

<pre class="prettyprint" data-lang="html">
&lt;html lang="en" ng-app&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Geektic&lt;/title&gt;
&lt;/head&gt;
&lt;body ng-controller="GeeksListCtrl"&gt;
    &lt;div ng-repeat="geek in geeks"&gt;
        &lt;h4&gt;{{geek.lastname}} {{geek.firstname}}&lt;/h4&gt;
        &lt;p&gt;From {{geek.city}}&lt;/p&gt;
    &lt;/div&gt;
    &lt;script src="lib/angular/angular.js"&gt;&lt;/script&gt;
    &lt;script src="js/controllers.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

---

title: Model and controller

`app/js/controllers.js`

<pre class="prettyprint" data-lang="javascript">
function GeeksListCtrl($scope) {
    $scope.geeks = [
        {...},
        {...}
    ];
}
</pre>

Remember ...

<pre class="prettyprint" data-lang="html">
&lt;body ng-controller="GeeksListCtrl"&gt;
</pre>

and

<pre class="prettyprint" data-lang="html">
&lt;div ng-repeat="geek in geeks"&gt;
</pre>

---

title: Unit tests

`test/unit/controllersSpec.js`

<pre class="prettyprint" data-lang="javascript">
describe('breizhcamp-js backend controllers', function() {
  describe('GeeksListCtrl', function(){
    var scope, ctrl;

    beforeEach(function() {
      scope = {}, ctrl = new GeeksListCtrl(scope);
    });

    it('should create "geeks" model with 3 geeks', function() {
      expect(scope.geeks.length).toBe(3);
    });
  });
});
</pre>

Take a look at `scripts/test.sh` and run it !

---

title: End-to-end tests

`test/e2e/scenario.js`

<pre class="prettyprint" data-lang="javascript">
describe('breizhcamp-js backend app', function() {
  describe('Geeks list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });


    it('should filter the geeks list as user types into the search box', function() {
      expect(repeater('.geeks div').count()).toBe(3);
    });
  });
});
</pre>

Take a look at `scripts/e2e-test.sh` and run it !

---

title: Exercise 4

- Checkout the workspace for exercise 4 : 

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-4
</pre>

- Complete the model with some "static geeks"
- Complete the index.html view to rendre the geeks
- Play with the filtering
    - add an input text to filter the data
    - use the filter in the ng-repeat directive

<pre class="prettyprint" data-lang="html">
&lt;input ng-model="query" /&gt;
...
&lt;div ng-repeat="geek in geeks | filter:query" &gt;
</pre>

---

title: XHR

With the angular's `$http` service, it's easy to make HTTP requests to the backend.

<pre class="prettyprint" data-lang="html">
function GeeksListCtrl($scope, $http) {
    $http.get('geek/likes').success(function(data){
        $scope.geeks = data;
    });
}
</pre>

---

title: Exercise 5

- Checkout the workspace for exercise 5 : 

<pre class="prettyprint" data-lang="cmd">
git checkout -f exercise-5
</pre>

- Use the `$http` service to request the backend
- Use the `ng-change` directive to update the model when the search query changes

To go further ...

- Try to use the `$resource` service

<pre class="prettyprint" data-lang="javascript">
var Geeks = $resource('/geek/likes/:like?');
$scope.geeks = Geeks.get({like : $scope.query});
</pre>

---

title: grunt, make and co.
subtitle: JS tooling is good !
class: segue dark nobackground

---

title: Building the server side

- A POM (Plain Old Makefile), not a `pom.xml`!
- Get the things done
- Define targets for each task, e.g. clean, test, linting, etc.

<pre class="prettyprint" data-lang="makefile">
clean:
    rm -rf reports
</pre>

- Define variables that can be reused in tasks

<pre class="prettyprint" data-lang="makefile">
MOCHA="node_modules/.bin/mocha"
TESTS=$(shell find test/ -name "*.test.js")

test:
    $(MOCHA) -R spec $(TESTS)
</pre>

- Run a target with `make target`

---

title: Continuous integration

- Jenkins ready!

- The tooling we use, can produce various reports (unit testing, checkstyle, coverage, ...)

- Define a continuous integration target that call other targets

<pre class="prettyprint" data-lang="makefile">
ci: clean xunit checkstyle coverage sonar
</pre>

---

title: Mocha reporters

- Various outputs when running the tests : spec, xunit, nyan cat, etc. (see: [http://visionmedia.github.io/mocha/#reporters](http://visionmedia.github.io/mocha/#reporters))

- You can use buit-in reporters or extend Mocha by creating your own reporter.

- Install the xunit-file reporter to produce xunit compliant file

<pre class="prettyprint" data-lang="cmd">
npm install xunit-file --save-dev
</pre>

- TODO : Create a Makefile target that produce the xunit file
    - see the docs here : [https://github.com/peerigon/xunit-file](https://github.com/peerigon/xunit-file)

---

title: Code coverage with Istanbul

- Pretty straightforward, but note the double dash to distinguish `istanbul` args from the `mocha` ones and the use of `_mocha` internal executable (see [istanbul/issues/44](https://github.com/gotwarlost/istanbul/issues/44))

<pre class="prettyprint" data-lang="cmd">
istanbul cover _mocha -- -R spec test/**/*.test.js
</pre>

- TODO : Create a Makefile target that only produce a lcov file

- lcov format is directly usable by Sonar
- To display coverage results in Jenkins, use [lcov-to-cobertura](http://eriwen.github.io/lcov-to-cobertura-xml/) + [jenkins coverage plugin](https://wiki.jenkins-ci.org/display/JENKINS/Cobertura+Plugin)

---

title: Frontend package management with Bower

- [Bower](http://bower.io/) is a repository of packaged components (JS, CSS, or whatever)
- Defined in `bower.json`.
- You can depend on various format of assets
    - Registered asset within bower : `bower install jquery`
    - Files : `bower install http://domain.com/myFile.js`
    - Archives : `bower install http://domain.com/myArchive.zip`
    - Github repo : `bower install repoOwner/repo`
    - Github tag/commit `bower install jquery#1.9.1`

- TODO : create the `bower.json` file with `bower init` and manage angular libs with bower.
- Use `bower search` and `bower install XXX --save`

---

title: Building the client side with Grunt

- [Grunt](http://gruntjs.com) is a JS task runner.
- Install `grunt-cli` globally, and `grunt` as a dev dependency in your project.

<pre class="prettyprint" data-lang="cmd">
npm install grunt-cli -g;npm install grunt --save-dev
</pre>

- Create a `Gruntfile.js`

<pre class="prettyprint" data-lang="javascript">
module.exports = function(grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    // the tasks definition goes here
  });
  grunt.registerTask('default', []);
};
</pre>

- Run `grunt` (will do nothing but without errors :))

---

title: Grunt

- Plugin based
- Official ones start with `grunt-contrib`, see [http://gruntjs.com/plugins](http://gruntjs.com/plugins)
- Add the clean plugin

<pre class="prettyprint" data-lang="cmd">
npm install grunt-contrib-clean --save-dev
</pre>

- And add the following in `Gruntfile.js` to make the task available

<pre class="prettyprint" data-lang="javascript">
grunt.loadNpmTasks('grunt-contrib-clean');
</pre>

---

title: Grunt (continued)

- You can now define the `clean` task (JSON object or array) and plug this task in your build lifecycle.

<pre class="prettyprint" data-lang="javascript">
module.exports = function(grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    // the tasks definition goes here
    clean: ['myDistDir']
  });
  grunt.registerTask('default', [clean]);
  grunt.loadNpmTasks('grunt-contrib-clean');
};
</pre>

- The command `grunt` is a shorthand for `grunt default`. You can also call single tasks, e.g. `grunt clean`

---

title: Grunt (continued)

- You can define sub and super tasks inside your task to be more specific

<pre class="prettyprint" data-lang="javascript">
module.exports = function(grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    // the tasks definition goes here
    clean: {
      build: ['myDistDir'],
      postbuild: ['myDistDir/tmp']
    }
  });
  grunt.registerTask('default', [clean:build]);
  grunt.registerTask('buildCleanUp', [clean:postbuild]);
  grunt.registerTask('mySuperTask', [default, buidCleanUp]);

  grunt.loadNpmTasks('grunt-contrib-clean');
};
</pre>

---

title: Frontend build process

It mainly consists on the following tasks:

- lint your code
- run tests
- concatenate your JS and CSS files
- minify your code
- copy all the assest and created files in a dist folder

You can do much more to fit exactly your needs.

---

title: Real Gruntfile.js example

We are going to change of branch, save and commit what you want to keep.

<pre class="prettyprint" data-lang="cmd">
git checkout master
</pre>

And open `client/Gruntfile.js`.

TODO1 : try to run some of the defined tasks

TODO2 : adapt the `watch` task to have an always up-to-date build dir.

See [livereload](http://livereload.com/) or the livereload script definition in `client/src/index.html` 

---

title: Moar Grunt

- [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started) RTFM FTW!
- Amazing API : [http://gruntjs.com/api/grunt](http://gruntjs.com/api/grunt)
- Super easy to create your own tasks : [http://gruntjs.com/api/grunt.task#grunt.task.registertask](http://gruntjs.com/api/grunt.task#grunt.task.registertask)
- A ton of [plugins](http://gruntjs.com/plugins)!

---

title: CI and QA

We are able to define super tasks with `make` and `grunt` so you just need to create a ci task for each.

For QA you can generate reports from the tools involved in the build, or use Sonar.

Sonar digests xunit files for test results and lcov files for coverage, and we shown how to generate these ones. Just install the [Javascript plugin](http://docs.codehaus.org/display/SONAR/JavaScript+Plugin)

---

title: Node.js (continuous) deployment

- Use [nginx](http://wiki.nginx.org/Main) (or similar) to serve static content and as a reverse proxy for your node.js server.
- Use git post commit hooks (or a secure copy) to update your production code.
- Use a service manager to run your app
    - [init](http://man.he.net/man8/init), [upstart](http://upstart.ubuntu.com/), [systemd](http://freedesktop.org/wiki/Software/systemd/)

- Icing on the cake : try Socket based activation! Run your app only when people are using it. (see [systemd.socket](http://www.freedesktop.org/software/systemd/man/systemd.socket.html) as potential solution)

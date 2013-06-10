title: Content

Javascript is everywhere !

Case study : `geektic`* written entirely in Javascript and powered by

- `Angular.js` for the frontend
- `Node.js` for the backend
- `MongoDB` for the NoSQL database

\* geektic was originaly developed by the code-story team for DevoxxFR 2013 (see [https://github.com/CodeStory/code-story-geektic](https://github.com/CodeStory/code-story-geektic))

---

title: Hands-on lab

3 main parts : 

- `MongoDB` : "NoSQL loves JSON"
- `Node.js` : "Server-side JS"
- `Angular.js` : "Superheroic Javascript MVW Framework"

Exercises : 

- A Git repository with some code and todos
- One tag per exercise
- Reset your workspace with the following command :

<pre class="prettyprint" data-lang="cmd">
$ git checkout -f exercise-n
</pre>
"n" corresponds to the exercise's number.

---

title: Prerequisites - shell & make

- A command line tool!
- A `Make` tool
    - `make -v` must work

<pre class="prettyprint" data-lang="cmd">
$ make -v
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
$ git --version
git version 1.7.9.5
</pre>

![git_logo](http://git-scm.com/images/logos/2color-lightbg@2x.png)

---

title: Prerequisites - node.js

- Node.js : see [http://nodejs.org/](http://nodejs.org/)
    - `node -v` and `npm -v` must work

<pre class="prettyprint" data-lang="cmd">
$ node -v
v0.10.7
</pre>

<pre class="prettyprint" data-lang="cmd">
$ npm -v
1.2.21
</pre>

![nodejs_logo](http://upload.wikimedia.org/wikipedia/en/a/a7/Nodejs_logo_light.png)

---

title: Prerequisites - mongodb

- MongoDB : see [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)
    - `mongo --version` must work

<pre class="prettyprint" data-lang="cmd">
$ mongo --version
MongoDB shell version: 2.2.4
</pre>

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

- Play with the Mongo shell !
    - Insert geeks
    - Execute some `find` queries
    - Try `find` with regular expressions

TODO : git checkout -f exercise-1

---

title: Node.js
subtitle: JS on the server side
class: segue dark nobackground

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

- Write a script to populate the geeksDB database, from the `geeks.json` file.
- Check the script execution with the Mongo shell !
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

TODO : git checkout -f exercise-2
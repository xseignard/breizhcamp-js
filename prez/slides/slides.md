title: Prerequisites

You need to have the following installed, if not, too bad for you, we won't help.

- A command line tool!
- A `Make` tool
- Git : see [http://git-scm.com/](http://git-scm.com/)
	- `git --version` must work
- Node.js : see [http://nodejs.org/](http://nodejs.org/)
	- `node -v` and `npm -v` must work
- MongoDB : see [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)
	- `mongo --version` must work

---

title: Prerequisites
subtitle: Windows users

- Git for windows comes with a command line tool
- For the make tool, you can install `mingw32-make`

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

![mongodb_logo](http://api.mongodb.org/scala/casbah/2.1.5.0/_static/logo-mongodb.png)

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
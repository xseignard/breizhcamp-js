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
title: Pony pause!

<iframe src="http://panzi.github.io/Browser-Ponies/ponies-iframe.html#fadeDuration=500&volume=1&fps=25&speed=3&audioEnabled=false&showFps=false&showLoadProgress=true&speakProbability=0.1&spawn.applejack=1&spawn.fluttershy=1&spawn.pinkie%20pie=1&spawn.rainbow%20dash=1&spawn.rarity=1&spawn.twilight%20sparkle=1&paddock=true&grass=true" style="overflow:hidden;border-style:none;margin:0;padding:0;background:transparent;width:100%;max-height:80%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

---

title: Centered content
content_class: flexbox vcenter

Bayrou is at the center!

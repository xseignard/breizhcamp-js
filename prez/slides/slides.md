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

title: G33k document

MongoDB is a document-oriented NoSQL database.

This kind of JSON documents will be inserted into the Mongo database : 

<pre class="prettyprint" data-lang="json">
{
    "FIRSTNAME" : "Prunier",
    "LASTNAME" : "Sébastien",
    "MAIL" : "me@my-domain.com",
    "TOWN" : "Nantes",
    "LIKES" : ["Javascript", "Breizhcamp"],
    "HATES" : ["Rain"]
}
</pre>

---

title: Start mongod

Use the `--dbpath` argument to set the mongo data directory

<pre class="prettyprint" data-lang="cmd">
mongod --dbpath=/home/sebprunier/data/mongo/breizhcamp-js/
</pre>

---

title: Populate database

Run the `PopulateDB.js` script to insert geeks into the database :

- `node server/src/scripts/PopulateDB.js`

Connect to the `geeksDB` database : 

- `mongo geeksDB`

Use the mongo shell to find geeks that love javascript : 

- `db.geeks.find( { "LIKES" : /^javascript$/i } )`

---

title: Node.js
subtitle: JS on the server side
class: segue dark nobackground

---

title: Ponies!

<!--
<script type="text/javascript" src="http://panzi.github.io/Browser-Ponies/basecfg.js" id="browser-ponies-config"></script><script type="text/javascript" src="http://panzi.github.io/Browser-Ponies/browserponies.js" id="browser-ponies-script"></script><script type="text/javascript">/* <![CDATA[ */ (function (cfg) {BrowserPonies.setBaseUrl(cfg.baseurl);BrowserPonies.loadConfig(BrowserPoniesBaseConfig);BrowserPonies.loadConfig(cfg);})({"baseurl":"http://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"applejack":1,"fluttershy":1,"pinkie pie":1,"rainbow dash":1,"rarity":1,"twilight sparkle":1},"autostart":true}); /* ]]> */</script>
-->

We all love ponies! We just don't admit it!

<footer class="source">source: <a href="http://panzi.github.io/Browser-Ponies/">http://panzi.github.io/Browser-Ponies/</a></footer>

---

title: Code Example

<pre class="prettyprint" data-lang="javascript">
function watman() {
  return Array(16).join('wat' - 1) + ' Batman!';
}
</pre>

---

title: Centered content
content_class: flexbox vcenter

Bayrou is at the center!

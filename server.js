const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var db;

MongoClient.connect('mongodb://paco.orozco:Ddevil95116!@ds011963.mlab.com:11963/my-quotes', function(err, database) {
  if(err) return console.log(err);
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000');
  })
})

//app.get(path, callback);
app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result) {
    if(err) return console.log(err);
    // render index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

// path for quotes
app.post('/quotes', function(req,res) {
  db.collection('quotes').save(req.body, function(err, result) {
    if(err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  })

  db.collection('quotes').find().toArray(function(err, results) {
  console.log(results);
  // Send HTML file populated with quotes here
})
})

app.put('/quotes', function(req, res) {
  //app.use(bodyParser.json())
  db.collection('quotes')
  .findOneAndUpdate({name: 'yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert:true
  }, function(err, result) {
    if(err) return res.send(err)
      res.send(result)

  })
})

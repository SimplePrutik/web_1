var ObjectID = require('mongodb').ObjectID;

//1. Реализовать Rest методы, используя Express.js (put, post, get, delete) для набора повторяющихся данных из макета (например для ленты новостей).

module.exports = function(app, db) {

  app.get('/reviews', (req, res) => {
    db.collection('reviews').find({}).toArray(function (err, items) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.json(items);
      } 
  	});
  });

  app.post('/reviews', (req, res) => {
    console.log(req.body)
    const note = { review: req.body.review, author: req.body.author, job: req.body.job, sometext: req.body.sometext };
    db.collection('reviews').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { review: req.body.review, author: req.body.author, job: req.body.job, sometext: req.body.sometext  };
    db.collection('reviews').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

  app.delete('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('reviews').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
};
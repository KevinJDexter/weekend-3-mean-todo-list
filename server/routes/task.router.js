const Tasks = require('../models/task.schema');
const router = require('express').Router();

router.get('/', (req, res) => {
  Tasks.find({})
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log('error in /task GET:', error);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  Tasks.create(req.body)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in /task POST:', error);
      res.sendStatus(500);
    })
})

router.put('/', (req, res) => {
  Tasks.findByIdAndUpdate(req.body._id, req.body)
    .then((response => {
      res.sendStatus(202);
    }))
    .catch((error) => {
      console.log('error in /task PUT:', error);
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
  Tasks.findByIdAndRemove(req.query._id)
    .then((response => {
      res.sendStatus(200);
    }))
    .catch((error) => {
      console.log('error in /task DELETE:', error);
      res.sendStatus(500);
    })
})

module.exports = router;
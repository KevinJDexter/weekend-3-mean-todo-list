const Tasks = require('../models/task.schema');
const router = require('express').Router();

// Gets all tasks from the Database
router.get('/', (req, res) => {
  Tasks.find(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log('error in /task GET:', error);
      res.sendStatus(500);
    })
})

// Creates a new task in the database
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

// Updates an existing class in the database
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

// Deletes an existing class from the database
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
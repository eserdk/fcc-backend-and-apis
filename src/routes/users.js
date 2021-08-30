const Router = require('express-promise-router')
const controller = require('../controller')

const router = new Router()
module.exports = router

router.post('/', async(req, res) => {
  //You can POST to /api/users with form data username to create a new user.
  // The returned response will be an object with username and _id properties.
  res.json(await controller.createUser(req.body.username))
})

router.get('/', async(req, res) => {
  // You can make a GET request to /api/users to get an array of all users.
  // Each element in the array is an object containing a user's username and _id.
  res.json(await controller.getUsers())
})

router.post('/:_id/exercises', async(req, res) => {
  // You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date.
  // If no date is supplied, the current date will be used.
  // The response returned will be the user object with the exercise fields added.
  res.json(await controller.createExercise(req.params['_id'], req.body['description'], req.body['duration'], req.body['date']))
})

router.get('/:_id/logs', async(req, res) => {
  // You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
  // The returned response will be the user object with a log array of all the exercises added.
  // Each log item has the description, duration, and date properties.

  // A request to a user's log (/api/users/:_id/logs) returns an object with a count property representing the number of exercises returned.

  // You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user.
  // from and to are dates in yyyy-mm-dd format.
  // limit is an integer of how many logs to send back.
  res.json(await controller.getExercises(req.params['_id'], req.body['from'], req.body['to'], req.query['limit']))
})
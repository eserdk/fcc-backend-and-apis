const db = require('../db')
const uuid = require('uuid')

async function createUser (username) {
  const id = uuid.v4()
  await db.query(
    'INSERT INTO users(id, username) VALUES ($1, $2);',
    [id, username])
  return { _id: id, username: username }
}

async function getUsers () {
  const { rows } = await db.query('SELECT id as _id, username FROM users')
  return rows
}

async function createExercise (userId, description, duration, date) {
  const id = uuid.v4()
  let params = [id, userId, description, duration]
  if (date) {params.push(date)}
  let q = 'INSERT INTO exercises(id, user_id, description, duration, date) VALUES ($1, $2, $3, $4, '
  q += date ? '$5);' : 'DEFAULT);'
  await db.query(q, params)
  const { rows } = await db.query(
    'SELECT u.id as _id, u.username, e.description, e.duration, e.date FROM users u JOIN exercises e on u.id = e.user_id WHERE u.id = $1 AND e.id = $2;',
    [userId, id])
  return {
    _id: rows[0]._id,
    username: rows[0].username,
    description: rows[0].description,
    duration: rows[0].duration,
    date: new Date(rows[0].date).toDateString(),
  }
}

async function getExercises (userId, from, to, limit) {
  let q = 'SELECT u.id as user_id, u.username, e.description, e.duration, e.date FROM users u JOIN exercises e on e.user_id = u.id WHERE u.id = $1'
  let params = [userId]
  let params_counter = 2

  if (from || to) {
    if (from) {
      q += ' AND e.date >= $' + params_counter
      params.push(from)
      params_counter++
    }

    if (to) {
      q += ' AND e.date <= $' + params_counter
      params.push(to)
      params_counter++
    }
  }

  if (limit) {
    q += ' LIMIT $' + params_counter
    params.push(limit)
  }
  q += ';'
  const { rows } = await db.query(q, params)
  if (!rows.length) {return {}}
  let log = []
  for (let i in rows) {
    log.push({
      description: rows[i].description,
      duration: rows[i].duration,
      date: new Date(rows[i].date).toDateString(),
    })
  }
  return {
    count: rows.length,
    _id: rows[0].user_id,
    username: rows[0].username,
    log: log,
  }
}

module.exports = {
  createUser: (username) => createUser(username),
  getUsers: () => getUsers(),
  createExercise: (userId, description, duration, date) => createExercise(
    userId, description, duration, date),
  getExercises: (userId, from, to, limit) => getExercises(userId, from, to,
    limit),
}
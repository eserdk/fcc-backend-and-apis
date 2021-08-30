const db = require('db')
const uuid = require('uuid')

async function createUser (username) {
  const _id = uuid.v4()
  await db.query(
    'INSERT INTO users(username, id) VALUES ($1) RETURNING id as _id',
    [username, _id])
  return { _id: _id, username: username }
}

async function getUsers () {
  const { rows } = await db.query('SELECT id as _id, username FROM users')
  return rows
}

async function createExercise (userId, description, duration, date) {
  const { rows } = await db.query(
    'INSERT INTO exercises(user_id, description, duration, date) VALUES ($1, $2, $3, $4) RETURNING id as _id',
    [userId, description, duration, date.toUTCString()])
  return rows[0]
}

async function getExercises (userId, from, to, limit) {
  let q = 'SELECT u.id as user_id, u.username, e.description, e.duration, e.date,  FROM users u JOIN exercises e on e.user_id = u.id'
  let params = []
  let params_counter = 1

  if (from || to) {
    q += ' WHERE'
    if (from) {
      q += ' u.date >= $' + params_counter
      params.push(from.toUTCString())
      params_counter++
    }

    if (to) {
      if (from) {
        q += ' AND'
      }
      q += ' u.date <= $' + params_counter
      params.push(to.toUTCString())
      params_counter++
    }
  }
  if (limit) {
    q += ' LIMIT $' + params_counter
    params.push(limit)
  }
  q += ';'
  const { rows } = await db.query(q, params)
  console.log(rows)
}

module.exports = {
  createUser: (username) => createUser(username),
  getUsers: () => getUsers(),
  createExercise: (userId, description, duration, date) => createExercise(
    userId, description, duration, date),
  getExercises: (userId, from, to, limit) => getExercises(userId, from, to,
    limit),
}
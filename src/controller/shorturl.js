const redis = require('redis').createClient(process.env.REDIS_URL)
const md5 = require('crypto-js/md5')
const b64 = require('crypto-js/enc-base64url')

function getKey (string) {
  return b64.stringify(md5(string)).substring(0, 8)
}

function getShortURL (url) {
  const key = getKey(url)
  redis.set(key, url)
  return key
}

function getLongURL (key, cb) {
  redis.get(key, (e, reply) => {
    cb(reply)
  })
}

module.exports = {
  getShortURL: (url) => getShortURL(url),
  getLongURL: (key, cb) => getLongURL(key, cb),
}
const redis = require('redis').createClient(process.env.REDIS_URL)
const { promisify } = require('util');
const md5 = require('crypto-js/md5')
const b64 = require('crypto-js/enc-base64url')

const setAsync = promisify(redis.set).bind(redis);
const getAsync = promisify(redis.get).bind(redis);


function getKey (string) {
  return b64.stringify(md5(string)).substring(0, 8)
}

async function getShortURL (url) {
  const key = getKey(url)
  await setAsync(key, url)
  return key
}

async function getLongURL (key) {
  return await getAsync(key)
}

module.exports = {
  getShortURL: (url) => getShortURL(url),
  getLongURL: (key) => getLongURL(key),
}

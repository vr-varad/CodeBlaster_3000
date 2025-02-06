const Redis = require('ioredis')

const redisConfig = {
    port: 6379,
    host: 'redis'
}

const redisConnection = new Redis(redisConfig)

module.exports = redisConnection
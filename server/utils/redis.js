import Redis from 'ioredis'

const redisConfig = {
    port: 6379,
    host: 'redis'
}

const redisConnection = new Redis(redisConfig)

export default redisConnection
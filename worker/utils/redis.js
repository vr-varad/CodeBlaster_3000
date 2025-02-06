import Redis from 'ioredis'

const redisConfig = {
    port: 6379,
    host: 'redis',
    maxRetriesPerRequest: null
}

const redisConnection = new Redis(redisConfig)

export default redisConnection
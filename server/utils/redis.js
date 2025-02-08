import Redis from 'ioredis'

let redisConfig;

if (process.env.NODE_ENV === 'production') {
    redisConfig = {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    }
}else{
    redisConfig = {
        port: 6379,
        host: '127.0.0.1',
    }
}

const redisConnection = new Redis(redisConfig)

export default redisConnection
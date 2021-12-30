import IORedis from 'ioredis'

const RedisRead = new IORedis(
  Number.parseInt(process.env['REDIS_PORT'] ?? '6379', 10),
  process.env['REDIS_HOST'], {
    db: Number.parseInt(process.env['REDIS_DB'] ?? '0', 10),
    password: process.env['REDIS_PASS'],
  },
)

const RedisWrite = new IORedis(
  Number.parseInt(process.env['REDIS_PORT'] ?? '6379', 10),
  process.env['REDIS_HOST'], {
    db: Number.parseInt(process.env['REDIS_DB'] ?? '0', 10),
    password: process.env['REDIS_PASS'],
  },
)

export { RedisRead, RedisWrite }

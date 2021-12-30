import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import dotenv from 'dotenv-flow'
const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __root = path.resolve(__dirname, '..')

const env = dotenv.config({
  path: __root,
})
// console.log('Loaded env:', env)

// eslint-disable-next-line import/first
import { start as startBot } from './bot/index.js'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startBot()

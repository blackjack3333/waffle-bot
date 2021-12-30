import { session as grammySession } from 'grammy'
import { RedisAdapter } from '@satont/grammy-redis-storage'
import { RedisWrite } from '../redis.js'
import { MyContext, Session } from './my-context.js'
import { i18n } from './i18n.js'

export const storage = new RedisAdapter<Session>({ instance: RedisWrite })

export const session = grammySession<Session, MyContext>({
  initial: (): Session => ({
    __language_code: i18n.config.defaultLanguage,
    authed: false,
    lang: 'ru',
  }),
  storage,
})


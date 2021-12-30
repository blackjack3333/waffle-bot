import { Composer } from 'grammy'
import { RedisRead } from '../../redis.js'
import { MyContext } from '../my-context.js'
import { Api, axios } from '../api/index.js'
import { i18n } from '../i18n.js'
import { storage } from '../session.js'
import { bot } from '../index.js'

export const Acccounting = new Composer<MyContext>()

namespace ApiResponses {
  export interface AuthUrl {
    authUrl: string;
  }
}

Acccounting.command(['login', 'account'], async ctx => {
  if (ctx.session.authed) {
    await ctx.reply(ctx.i18n.t('info.hi-sign-out'))
    return
  }

  try {
    const resp = await Api.axios.get<ApiResponses.AuthUrl>('/api/v1/auth/url/telegram', {
      params: {
        appUserId: ctx.from?.id,
        username: ctx.from?.username,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
      },
    })
    await ctx.reply(ctx.i18n.t('info.login-tip', { authUrl: resp.data.authUrl }))
    ctx.session.authed = true
  } catch (error: unknown) {
    await ctx.reply(ctx.i18n.t('errors.generic'))
    if (axios.isAxiosError(error)) {
      await ctx.reply(`<code>${JSON.stringify(error.response?.data, null, '\t')}</code>`, { parse_mode: 'HTML' })
    }
  }
})

export enum BotAction {
  LoggedIn = 'logged-in',
}

export interface BotNotifyData {
  appUserId: string;
  action: BotAction;
}

RedisRead.subscribe('api:telegram', (error, count) => {
  if (error) {
    console.error('[REDIS] Failed to subscribe: %s', error?.message)
    console.error(error)
  }

  console.info('[REDIS] Subscribed to events')
})

RedisRead.on('message', async (channel: string, message: BotNotifyData) => {
  console.log(`Received ${message.action} from ${channel}`)
  if (message.action === BotAction.LoggedIn) {
    const userSession = await storage.read(message.appUserId)
    await bot.api.sendMessage(message.appUserId,
      i18n.t(userSession?.__language_code ?? i18n.config.defaultLanguage, 'info.logged-in'),
    )
  }
})

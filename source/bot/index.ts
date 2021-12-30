import { Bot } from 'grammy'
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time'
import { hydrateFiles } from '@grammyjs/files'
import { MenuMiddleware } from 'grammy-inline-menu'

import { i18n } from './i18n.js'
import { session } from './session.js'
import { MyContext } from './my-context.js'
import { menu } from './menu/index.js'

import { Acccounting } from './modules/accounting.js'
import { Voice } from './modules/voice.js'

const token = process.env['BOT_TOKEN']
if (!token) {
  throw new Error('You have to provide the bot-token from @BotFather via environment variable (BOT_TOKEN)')
}

export const bot = new Bot<MyContext>(token)

bot.use(session)
bot.use(i18n.middleware())

bot.api.config.use(hydrateFiles(bot.token))

if (process.env['NODE_ENV'] !== 'production') {
  // Show what telegram updates (messages, button clicks, ...) are happening (only in development)
  bot.use(generateUpdateMiddleware())
}

bot.catch(error => {
  console.error('Error occured', error)
})

bot.use(Acccounting)
bot.use(Voice)

const menuMiddleware = new MenuMiddleware('/', menu)
bot.command('start', async ctx => {
  await ctx.reply(ctx.i18n.t('welcome'))
})
bot.command('language', async ctx => {
  ctx.session.lang = ctx.session.lang === 'en' ? 'ru' : 'en'
  await ctx.reply(ctx.i18n.t('info.lang-switched', { lang: ctx.session.lang }))
})
bot.command('settings', async ctx => menuMiddleware.replyToContext(ctx, '/settings/'))
bot.command('help', async ctx => ctx.reply(ctx.i18n.t('help')))
bot.use(menuMiddleware.middleware())
bot.command('signout', async ctx => {
  ctx.session.authed = false
  await ctx.reply(ctx.i18n.t('info.logged-out'))
})

bot.on('message', async ctx => {
  if (!ctx.session.authed) {
    await ctx.reply(ctx.i18n.t('errors.not-logged-in'))
    return
  }

  await ctx.reply(ctx.i18n.t('info.description'))
})

export async function start(): Promise<void> {
  await bot.api.setMyCommands([
    { command: 'start', description: 'open the menu' },
    { command: 'login', description: 'sign-in to Waff.ly account' },
    { command: 'account', description: 'create Waff.ly account' },
    { command: 'language', description: 'set language used in your voice messages' },
    { command: 'help', description: 'show the help' },
    { command: 'settings', description: 'open the settings' },
  ])

  await bot.start({
    onStart: botInfo => {
      console.log(new Date(), `Bot starts as @${botInfo.username}`)
    },
  })
}

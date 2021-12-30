import { Composer } from 'grammy'
import { MyContext } from '../my-context.js'
import { Api, axios } from '../api/index.js'
import { bot } from '../index.js'

export const Voice = new Composer<MyContext>()

Voice.on('message:voice', async ctx => {
  if (!ctx.session.authed) {
    await ctx.reply(ctx.i18n.t('errors.not-logged-in'))
    return
  }

  await ctx.replyWithChatAction('typing')
  // const { voice } = ctx.msg
  // const { duration } = voice
  // await ctx.reply(`Your voice message is ${duration} seconds long.`)

  // const fileId = voice.file_id
  // await ctx.reply('The file identifier of your voice message is: ' + fileId)

  const file = await ctx.getFile()
  const path = file.file_path ?? ''
  const link = path ? `https://api.telegram.org/file/bot${bot.token}/${path}` : ''
  if (link) {
    // await ctx.reply(`Link: ${link}`)
    // await ctx.replyWithChatAction('typing')
    let resp: any = {}
    try {
      resp = await Api.axios.post('https://api.waffly.ga/api/v1/files/audio', {
        botType: 'telegram',
        appUserId: String(ctx.from?.id),
        lang: ctx.session.lang || 'ru',
        link,
      })
      // await ctx.reply(`Uploaded: ${JSON.stringify(resp.data as Record<string, unknown>)}`)
    } catch (error: unknown) {
      await ctx.reply(ctx.i18n.t('errors.generic'))
      if (axios.isAxiosError(error)) {
        await ctx.reply(`<code>${JSON.stringify(error.response?.data, null, '\t')}</code>`, { parse_mode: 'HTML' })
      }
    }

    if (resp.status === 200) {
      console.log('Wafflified', resp?.data)
      await ctx.reply(ctx.i18n.t('info.wafflified'))
    } else {
      // await ctx.reply(ctx.i18n.t('errors.generic'))
      // await ctx.reply(`<code>${JSON.stringify(resp?.data, null, '\t')}</code>`, { parse_mode: 'HTML' })
    }
  } else {
    await ctx.reply(ctx.i18n.t('errors.generic'))
    // await ctx.reply('Something bad happend, cannot get link to file')
  }
  // await ctx.reply(`LINK: ${file.getUrl()}`)
})

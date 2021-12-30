import { MenuTemplate } from 'grammy-inline-menu'
import { I18n } from '@grammyjs/i18n'

import { MyContext } from '../../my-context.js'
import { backButtons } from '../general.js'

const i18n = new I18n({ directory: 'locales' })

const availableLocales = i18n.availableLocales().map(locale => `${i18n.t(locale, 'locale.icon')} ${i18n.t(locale, 'locale.name')} (${locale})`)

export const menu = new MenuTemplate<MyContext>(ctx => ctx.i18n.t('settings.language'))

menu.select('lang', availableLocales, {
  isSet: (ctx, key) => ctx.i18n.locale() === key,
  set: (ctx, key) => {
    ctx.i18n.locale(/\(([A-z]*)\)/.exec(key)?.[1] ?? ctx.i18n.config.defaultLanguage)
    return true
  },
})

menu.manualRow(backButtons)

import { MenuTemplate } from 'grammy-inline-menu'

import { MyContext } from '../my-context.js'

// import { menu as settingsMenu } from './settings/index.js'
import { menu as languageMenu } from './settings/language.js'

export const menu = new MenuTemplate<MyContext>(ctx => ctx.i18n.t('menu.settings'))

menu.submenu(ctx => ctx.i18n.t('menu.language'), 'lang', languageMenu)
// menu.submenu(context => context.i18n.t('menu.settings'), 'settings', settingsMenu)

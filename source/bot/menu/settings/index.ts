import { MenuTemplate } from 'grammy-inline-menu'

import { MyContext } from '../../my-context.js'
import { backButtons } from '../general.js'

import { menu as languageMenu } from './language.js'

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('settings.body'))

// menu.submenu(context => context.i18n.t('menu.language'), 'lang', languageMenu)

menu.manualRow(backButtons)

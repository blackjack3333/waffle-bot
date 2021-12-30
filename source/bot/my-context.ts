import { Api, Context, SessionFlavor } from 'grammy'
import { I18nContextFlavor } from '@grammyjs/i18n'
import { FileFlavor, FileApiFlavor } from '@grammyjs/files'

export interface Session {
  authed: boolean;
  lang: string;
  __language_code: string;
}

export type MyContext = Context & SessionFlavor<Session> & I18nContextFlavor & FileFlavor<Context> & FileApiFlavor<Api>

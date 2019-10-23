import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import gb from './gb'

Vue.use(VueI18n)
const zhLang = Object.assign({}, zh)
const enLang = Object.assign({}, en)
const gbLang = Object.assign({}, gb)

const i18nMessage = {
  zh: zhLang,
  en: enLang,
  gb: gbLang
}

const lang = window.sessionStorage.getItem('lang') || 'zh'
const i18n = new VueI18n({
  silentTranslationWarn: false,
  locale: lang,
  messages: i18nMessage
})

export default i18n

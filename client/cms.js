import {Texts} from "../lib/collection"
import {Session} from "meteor/session"

const defaultLanguageCode = "en"



export function getTexts() {
  const languageCode = getCurrentLanguageCode()
  const texts = Texts.findOne({languageCode: languageCode})
  if (languageCode == defaultLanguageCode) {
    return texts
  } else {
    return Object.assign(getEnglishTexts(), texts)
  }
}

export function getEnglishTexts() {
  return Texts.findOne({languageCode: "en"})
}

export function setCurrentLanguageCode(languageCode) {
  console.log("setCurrentLanguageCode", languageCode)
  Session.set("currentLanguageCode", languageCode)
}

export function getCurrentLanguageCode() {
  const languageCode = Router.current().params._languageCode
  if (languageCode) {
    return languageCode
  } else {
    return "en"
  }
}

export function getCurrentLanguageName() {
  return ISOLanguages.getName(getCurrentLanguageCode())
}

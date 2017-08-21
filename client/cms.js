import {Texts} from "../lib/collection"
import {Session} from "meteor/session"

const defaultLanguageCode = "en"



export function getTexts() {
  const preview = Session.get("preview")

  if (preview) {
    if (preview.languageCode == defaultLanguageCode) {
      return preview
    } else {
      return Object.assign(getEnglishTexts(), preview)
    }

  } else {
    const languageCode = getCurrentLanguageCode()
    const texts = Texts.findOne({languageCode: languageCode})
    if (languageCode == defaultLanguageCode) {
      return texts
    } else {
      return Object.assign(getEnglishTexts(), texts)
    }
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
  const languageCode = Session.get("currentLanguageCode")
  if (!languageCode) {
    return defaultLanguageCode
  } else {
    return languageCode
  }
}

export function getCurrentLanguageName() {
  ISOLanguages.getName(getCurrentLanguageCode())
}

Template.registerHelper('text', function() {
  return getTexts()
})
Template.registerHelper('preview', function() {
  return Session.get("preview")
})


Template.registerHelper('currentLanguageCode', function() {
  return getCurrentLanguageCode()
})

Template.registerHelper('currentLanguageName', function() {
  return getCurrentLanguageName()
})
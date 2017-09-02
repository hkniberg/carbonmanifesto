import {Texts} from "../lib/collection"
import {Session} from "meteor/session"
import {copyLinks} from "../lib/util";
import {textKeys} from "../lib/collection"
import {countLinks} from "../lib/util";

const defaultLanguageCode = "en"



export function getTexts() {
  const languageCode = getCurrentLanguageCode()
  let translatedTexts = Texts.findOne({languageCode: languageCode})
  const englishTexts = getEnglishTexts()

  if (languageCode == defaultLanguageCode) {
    return translatedTexts
  } else {
    textKeys.forEach((textKey) => {
      if (translatedTexts[textKey]) {
        translatedTexts[textKey] = copyLinks(englishTexts[textKey], translatedTexts[textKey])
      }
    })
    return Object.assign(englishTexts, translatedTexts)
  }
}


export function getEnglishTexts() {
  return Texts.findOne({languageCode: "en"})
}


export function isLinkCountIncorrect(languageCode, textKey) {
  const text = Texts.findOne({languageCode: languageCode})
  if (text && text[textKey]) {
    const translatedLinkCount = countLinks(text[textKey])
    const englishText = Texts.findOne({languageCode: 'en'})
    const originalLinkCount = countLinks(englishText[textKey])
    if (translatedLinkCount != originalLinkCount) {
      return true
    }
  }
  return false
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



export function setTranslationStatus(status, thenSurfToRoute) {
  const languageCode = getCurrentLanguageCode()
  Meteor.call('setTranslationStatus', languageCode, status, function(err) {
    if (err) {
      console.log("An error occurred during setTranslationStatus", err)
    } else {
      if (thenSurfToRoute) {
        Router.go(thenSurfToRoute)
      }
    }
  })
}


export function getTranslatedTextCount(languageCode) {
  if (!languageCode) {
    languageCode = getCurrentLanguageCode()
  }
  let count = 0
  const texts = Texts.findOne({languageCode: languageCode})
  if (!texts) {
    return 0
  }
  textKeys.forEach((textKey) => {
    if (texts[textKey] && !isLinkCountIncorrect(languageCode, textKey)) {
      ++count
    }
  })
  return count
}

export function isFullyTranslated() {
  return getTranslatedTextCount() >= textKeys.length
}

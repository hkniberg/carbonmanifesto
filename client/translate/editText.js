import {Texts} from "../../lib/collection"
import {Session} from "meteor/session"
import {textKeys} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";
import {removeLinksFromMarkDown} from "../../lib/util";
import {countLinks} from "../../lib/util";
import {isLinkCountIncorrect} from "../cms";
import {setTranslationStatus} from "../cms";
import {getLanguageName} from "../../lib/data/languages";


Template.editText.onRendered(function() {
  const languageCode = getCurrentLanguageCode()

  const translateFromLanguage = 'en'
  const translateToLanguage = languageCode

  textKeys.forEach((textKey) => {
    Meteor.call('googleTranslate', textKey, translateFromLanguage, translateToLanguage, function(err, translatedText) {
      if (err) {
        translatedText = ""
      }
      Session.set("googleTranslation-" + textKey + "-" + translateFromLanguage + "-" + translateToLanguage, translatedText)
    })
  })

  window.scrollTo(0, 0)
})

function getEnglishText(textKey) {
  const text = Texts.findOne({languageCode: "en"})
  return removeLinksFromMarkDown(text[textKey])
}

Template.editText.helpers({
  languageName() {
    const languageCode = getCurrentLanguageCode()
    return getLanguageName(languageCode)
  },

  textKeys() {
    return textKeys
  },

  rows() {
    const englishText = getEnglishText(this)
    return englishText.length / 20
  },

  englishText() {
    return getEnglishText(this)
  },
  
  googleTranslation() {
    const textKey = this
    const languageCode = getCurrentLanguageCode()
    return Session.get("googleTranslation-" + textKey + "-en-" + languageCode)
  },

  translation() {
    const textKey = this
    const languageCode = getCurrentLanguageCode()
    const text = Texts.findOne({languageCode: languageCode})
    if (text) {
      return text[textKey]
    }
  },

  wrongLinkCount() {
    const languageCode = getCurrentLanguageCode()
    const textKey = this
    if (isLinkCountIncorrect(languageCode, textKey)) {
      const englishLinkCount = countLinksForTextKey("en", textKey)
      const translatedLinkCount = countLinksForTextKey(languageCode, textKey)
      return "Incorrect link count! The english text has " + englishLinkCount + " links, this translation has " + translatedLinkCount + " links. Links are marked using [brackets]."
    }
  },

  borderClass() {
    const languageCode = getCurrentLanguageCode()
    const textKey = this
    const text = Texts.findOne({languageCode: languageCode})
    if (text && text[textKey]) {
      if (isLinkCountIncorrect(languageCode, textKey)) {
        return "invalidTranslation"
      } else {
        return "validTranslation"
      }
    } else {
      return "emptyTranslation"
    }
  }
})

function countLinksForTextKey(languageCode, textKey) {
  const text = Texts.findOne({languageCode: languageCode})
  return countLinks(text[textKey])
}

function getTranslationDoc() {
  const languageCode = getCurrentLanguageCode()

  const translation = {}
  textKeys.forEach((textKey) => {
    translation[textKey] = $(`[data-textkey=${textKey}]`).val()
  })
  translation.languageCode = languageCode
  translation.languageName = getLanguageName(languageCode)
  return translation
}



Template.editText.events({
  "click .previewButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go('/' + languageCode)
  },

  "click .reviewButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go('/' + languageCode + '/reviewText')
  },

  "click .approveButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('published', "/" + languageCode)
  },

  "click .unsubmitButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('started', "/" + languageCode + "/editText")
  },

  "click .unpublishButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('started', "/" + languageCode + "/editText")
  },

  "blur .translationTextArea"(event) {
    const textArea = event.target
    const textKey = $(textArea).data("textkey")
    const textValue = $(textArea).val()
    const languageCode = getCurrentLanguageCode()
    Meteor.call('saveText', languageCode, textKey, textValue)
  },

  "click .copyButton"(event) {
    const button = event.target
    const textKey = $(button).data("textkey")
    const languageCode = getCurrentLanguageCode()

    const googleTranslation = Session.get("googleTranslation-" + textKey + "-en-" + languageCode)
    if (googleTranslation) {
      Meteor.call('saveText', languageCode, textKey, googleTranslation, function(err) {
        if (err) {
          console.log("Error while calling saveText", err)
        }
      })
    }
  }

})
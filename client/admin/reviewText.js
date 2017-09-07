import {Texts} from "../../lib/collection"
import {Session} from "meteor/session"

import {textKeys} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";
import {countLinks} from "../../lib/util";
import {removeLinksFromMarkDown} from "../../lib/util";
import {isLinkCountIncorrect} from "../cms";
import {setTranslationStatus} from "../cms";

Template.reviewText.onRendered(function() {
  const languageCode = getCurrentLanguageCode()

  const translateFromLanguage = languageCode
  const translateToLanguage = 'en'
  
  textKeys.forEach((textKey) => {
    Meteor.call('googleTranslate', textKey, translateFromLanguage, translateToLanguage, function(err, translatedText) {
      if (err) {
        translatedText = ""
      }
      Session.set("googleTranslation-" + textKey + "-" + translateFromLanguage + "-" + translateToLanguage, translatedText)
    })
  })
})

function getEnglishText(textKey) {
  const text = Texts.findOne({languageName: "English"})
  return removeLinksFromMarkDown(text[textKey])
}

Template.reviewText.helpers({
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
    return Session.get("googleTranslation-" + textKey + "-" + languageCode + "-en")
  },

  translation() {
    const textKey = this
    const languageCode = getCurrentLanguageCode()
    const preview = Session.get("preview")
    if (preview) {
      return preview[textKey]
    }

    const text = Texts.findOne({languageCode: languageCode})
    if (text) {
      return text[textKey]
    }
  },

  wrongLinkCount() {
    const textKey = this
    const languageCode = getCurrentLanguageCode()
    const text = Texts.findOne({languageCode: languageCode})
    if (text && text[textKey]) {
      const translatedLinkCount = countLinks(text[textKey])
      const englishText = Texts.findOne({languageCode: 'en'})
      const originalLinkCount = countLinks(englishText[textKey])
      if (translatedLinkCount != originalLinkCount) {
        return "Incorrect link count! The english text has " + originalLinkCount + " links, this translation has " + translatedLinkCount + " links."
      }
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

Template.reviewText.events({
  "click .previewButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go("/" + languageCode)
  },

  "click .editButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go("/" + languageCode + "/editText")
  },

  "click .unpublishButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('started')
  },
  

  "click .approveButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('published', '/' + languageCode)
  }
  
  
  
})
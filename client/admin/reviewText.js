import {Texts} from "../../lib/collection"
import {Session} from "meteor/session"

import {textKeys} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";

Template.reviewText.onRendered(function() {
  const languageCode = getCurrentLanguageCode()

  const translateFromLanguage = languageCode
  const translateToLanguage = 'en'
  
  textKeys.forEach((textKey) => {
    Meteor.call('googleTranslate', textKey, translateFromLanguage, translateToLanguage, function(err, translatedText) {
      if (err) {
        translatedText = "N/A"
      }
      Session.set("googleTranslation-" + textKey + "-" + translateFromLanguage + "-" + translateToLanguage, translatedText)
    })
  })
})

function getEnglishText(textKey) {
  const text = Texts.findOne({languageName: "English"})
  return text[textKey]
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

  "click .approveButton"() {
    const languageCode = getCurrentLanguageCode()
    Meteor.call("approveTranslation", languageCode, function(err) {
      if (err) {
        console.log("Failed to approve", err)
      } else {
        Router.go("/admin")
      }
    })
  }
  
  
  
})
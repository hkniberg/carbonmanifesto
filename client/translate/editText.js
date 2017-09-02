import {Texts} from "../../lib/collection"
import {Session} from "meteor/session"
import {textKeys} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";
import {getTexts} from "../cms";


Template.editText.onRendered(function() {
  const languageCode = getCurrentLanguageCode()

  const translateFromLanguage = 'en'
  const translateToLanguage = languageCode

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

Template.editText.helpers({
  languageName() {
    const languageCode = getCurrentLanguageCode()
    return ISOLanguages.getName(languageCode)
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

function getTranslationDoc() {
  const languageCode = getCurrentLanguageCode()

  const translation = {}
  textKeys.forEach((textKey) => {
    translation[textKey] = $(`[data-textkey=${textKey}]`).val()
  })
  translation.languageCode = languageCode
  translation.languageName = ISOLanguages.getName(languageCode)
  return translation
}

function saveTranslation(status, thenSurfToRoute) {
  const translation = getTranslationDoc()
  if (status) {
    translation.status = status
  }
  Meteor.call('saveTranslation', translation, function(err) {
    if (err) {
      //TODO error handling
      console.log("An error occurred during saveTranslation", err)
    } else {
      Router.go(thenSurfToRoute)
    }

  })
}


Template.editText.events({
  "click .previewButton"() {
    const languageCode = getCurrentLanguageCode()
    saveTranslation('started', "/" + languageCode)
  },

  "click .reviewButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go('/' + languageCode + '/reviewText')
  },

  "click .approveButton"() {
    const languageCode = getCurrentLanguageCode()
    saveTranslation('published', "/" + languageCode)
  }
})
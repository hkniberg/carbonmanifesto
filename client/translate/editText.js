import {Texts} from "../../lib/collection"
import {Session} from "meteor/session"

const textKeys = ['header', 'background', 'pledge']

Template.editText.onRendered(function() {
  const languageCode = Template.currentData()
  textKeys.forEach((textKey) => {
    Meteor.call('googleTranslate', textKey, languageCode, function(err, translatedText) {
      if (err) {
        translatedText = "N/A"
      }
      Session.set("googleTranslation-" + textKey + "-" + languageCode, translatedText)
    })
  })
})

function getEnglishText(textKey) {
  const text = Texts.findOne({languageName: "English"})
  return text[textKey]
}

Template.editText.helpers({
  languageName() {
    const languageCode = this
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
    const languageCode = Template.parentData()
    return Session.get("googleTranslation-" + textKey + "-" + languageCode)
  },

  translation() {
    const textKey = this
    const languageCode = Template.parentData()
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

Template.editText.events({
  "click .previewButton"() {

    const languageCode = Template.currentData()
    
    const preview = {}
    textKeys.forEach((textKey) => {
      preview[textKey] = $(`[data-textkey=${textKey}]`).val()
    })
    preview.languageCode = languageCode
    preview.languageName = ISOLanguages.getName(languageCode)

    Session.set("preview", preview)
    Router.go("/preview")
  },

  "click .approveButton"() {
    const languageCode = Template.currentData()
    Meteor.call("approveTranslation", languageCode, function(err) {
      if (err) {
        console.log("Failed to approve", err)
      } else {
        Router.go("/admin")
      }
    })
  }
  
  
  
})
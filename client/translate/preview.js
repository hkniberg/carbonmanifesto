import {Session} from "meteor/session"
import {getCurrentLanguageCode} from "../cms";
import {setTranslationStatus} from "../cms";

Template.preview.events({
  "click .editButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go("/" + languageCode + "/editText")
  },

  "click .reviewButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go("/" + languageCode + "/reviewText")
  },

  "click .submitButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('pending', "/" + languageCode + "/translationSubmitted")
  },

  "click .unsubmitButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('started', "/" + languageCode + "/editText")
  },

  "click .approveButton"() {
    const languageCode = getCurrentLanguageCode()
    setTranslationStatus('published', "/" + languageCode)
  }

})
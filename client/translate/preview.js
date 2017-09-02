import {Session} from "meteor/session"
import {getCurrentLanguageCode} from "../cms";

Template.preview.events({
  "click .editButton"() {
    const languageCode = getCurrentLanguageCode()
    Router.go("/" + languageCode + "/editText")
  },

  "click .submitButton"() {
    const languageCode = getCurrentLanguageCode()
    Meteor.call('submitTranslationForApproval', languageCode, function(err) {
      if (err) {
        console.log("An error occurred during submitTranslationForApproval", err)
      } else {
        Router.go("/translationSubmitted")
      }
    })
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
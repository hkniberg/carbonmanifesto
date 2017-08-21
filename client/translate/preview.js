import {Session} from "meteor/session"

Template.preview.events({
  "click .editButton"() {
    console.log("preview", Session.get("preview"))
    const preview = Session.get("preview")
    console.log("preview", preview)
    Router.go("/editText/" + preview.languageCode)
  },

  "click .submitButton"() {
    const translation = Session.get('preview')
    Meteor.call('submitTranslation', translation, function(err) {
      Session.set('preview', null)
      Router.go("/translationSubmitted")
    })
  },

  "click .approveButton"() {
    const preview = Session.get("preview")
    Meteor.call("approveTranslation", preview.languageCode, function(err) {
      if (err) {
        console.log("Failed to approve", err)
      } else {
        Router.go("/admin")
      }
    })
  }

})
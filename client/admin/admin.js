import {Texts} from "../../lib/collection"

Template.admin.helpers({
  pending() {
    return Texts.find({status: "pending"})
  },

  loggedIn() {
    return !!Meteor.user()
  }
})

Template.admin.events({
  "click .languageButton"(event) {
    const button = event.target
    const languageCode = $(button).data("languagecode")
    Router.go('/' + languageCode + '/reviewText')
  }

})
import {Texts} from "../../lib/collection"
import {textKeys} from "../../lib/collection"
import {getTranslatedTextCount} from "../cms";

Template.admin.helpers({
  pending() {
    return Texts.find({status: "pending"}, {sort: {languageName: 1}})
  },

  started() {
    return Texts.find({status: "started"}, {sort: {languageName: 1}})
  },

  loggedIn() {
    return !!Meteor.user()
  },

  progress() {
    const texts = this
    const translatedCount = getTranslatedTextCount(texts.languageCode)
    const totalTextCount = textKeys.length
    return "" + Math.floor((translatedCount / totalTextCount) * 100) + "%"
  },

  lastUpdated() {
    if (this.lastUpdated) {
      return "(" + moment(this.lastUpdated).fromNow() + ")"
    }
  }
})

Template.admin.events({
  "click .languageButton"(event) {
    const languageCode = this.languageCode
    Router.go('/' + languageCode + '/reviewText')
  }

})
import {getCurrentLanguageCode} from "./cms"
import {getCurrentLanguageName} from "./cms";
import {getTexts} from "./cms";

Template.registerHelper("admin", function() {
  return Roles.userIsInRole(Meteor.user(), 'admin')
})
Template.registerHelper("user", function() {
  return Meteor.user()
})



Template.registerHelper("currentLanguageCode", function() {
  return getCurrentLanguageCode()
})

Template.registerHelper("currentLanguageName", function() {
  return getCurrentLanguageName()
})

Template.registerHelper('text', function() {
  return getTexts()
})

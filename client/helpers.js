import {getCurrentLanguageCode} from "./cms"
import {getCurrentLanguageName} from "./cms";
import {getTexts} from "./cms";
import {Texts} from "../lib/collection"
import {isFullyTranslated} from "./cms";

Template.registerHelper("admin", function() {
  return Roles.userIsInRole(Meteor.user(), 'admin')
})
Template.registerHelper("user", function() {
  return Meteor.user()
})


Template.registerHelper("languageExists", function() {
  const languageCode = Router.current().params._languageCode
  if (!languageCode || Texts.findOne({languageCode: languageCode})) {
    return true
  } else {
    return false
  }
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

Template.registerHelper('fullyTranslated', function() {
  return isFullyTranslated()
})


Template.registerHelper('started', function() {
  const languageCode = getCurrentLanguageCode()
  let texts = Texts.findOne({languageCode: languageCode})
  return texts && texts.status == 'started'
})

Template.registerHelper('pending', function() {
  const languageCode = getCurrentLanguageCode()
  let texts = Texts.findOne({languageCode: languageCode})
  return texts && texts.status == 'pending'
})

Template.registerHelper('published', function() {
  const languageCode = getCurrentLanguageCode()
  let texts = Texts.findOne({languageCode: languageCode})
  return texts && texts.status == 'published'
})



import {Texts, Signatures} from "../lib/collection"

Meteor.publish('texts', function() {
  return Texts.find()
})

Meteor.publish('signatures', function() {
  return Signatures.find()
})
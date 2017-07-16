import {Signatures} from "./collection"

Meteor.methods({
  sign: function(signature) {
    Signatures.insert(signature)
  }
})
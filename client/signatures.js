import {Signatures} from "../lib/collection"

Template.signatures.onRendered(function() {
  this.autorun(function() {
    Meteor.subscribe("signatures")
  })
})

Template.signatures.helpers({
  signatures() {
    return Signatures.find()
  }
  
})
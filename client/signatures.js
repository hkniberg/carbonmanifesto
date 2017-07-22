import {Signatures} from "../lib/collection"

Template.signatures.onRendered(function() {
  this.autorun(function() {
    Meteor.subscribe("signatures")
  })
})

Template.signatures.helpers({
  signatures() {
    return Signatures.find({}, {sort: {date: -1}})
  },

  formatDate(date) {
    return date.toLocaleDateString()
  },

  countryCodeLowerCase() {
    if (this.countryCode) {
      return this.countryCode.toLowerCase()
    }
  }

})
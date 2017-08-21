import {Signatures, Texts} from "./collection"

//TODO don't hardcode
const apiKey = "AIzaSyC1QDU4PnmXgAfS0dBrRPl9Sm1IxDnhBJg"

Meteor.methods({
  sign: function(signature) {
    console.assert(signature, "signature missing")

    const result = Signatures.insert(signature)
    console.log("Will return ", result)
    return result
  },
  
  setEmail: function(signatureId, email) {
    console.assert(signatureId, "signatureId missing")
    console.assert(email, "email missing")
    
    Signatures.update({_id: signatureId}, {$set: {email: email}})
  },

  googleTranslate: function(textKey, languageCode) {
    console.assert(textKey, "Missing textKey")
    console.assert(languageCode, "Missing languageCode")

    if (Meteor.isServer) {
      this.unblock()
      const texts = Texts.findOne({languageCode: 'en'})
      const text = texts[textKey]

      var googleTranslate = require('google-translate')(apiKey)
      const translate = Meteor.wrapAsync(googleTranslate.translate, googleTranslate.translate)
      const translation = translate(text, languageCode)
      return translation.translatedText
    }
  },

  submitTranslation: function(translation) {
    if (Texts.findOne({languageCode: translation.languageCode})) {
      throw new Meteor.Error("Translation for " + translation.languageCode + " alreday exists!")
    }
    translation.status = "pending"
    Texts.insert(translation)
  },

  approveTranslation: function(languageCode) {
    console.assert(languageCode, "Missing languageCode")

    if (!Meteor.isServer) {
      return
    }
    if (!Roles.userIsInRole(this.userId, "admin")) {
      throw new Meteor.Error("You must be admin to approve a translation!")
    }
    Texts.update({languageCode: languageCode}, {$set: {status: "published"}})
  }
})
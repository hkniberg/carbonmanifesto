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

  googleTranslate: function(textKey, fromLanguageCode, toLanguageCode) {
    console.assert(textKey, "Missing textKey")
    console.assert(fromLanguageCode, "Missing fromLanguageCode")
    console.assert(toLanguageCode, "Missing toLanguageCode")

    if (Meteor.isServer) {
      this.unblock()
      const texts = Texts.findOne({languageCode: fromLanguageCode})
      console.assert(texts, "Can't find any text with languageCode " + fromLanguageCode)
      const text = texts[textKey]

      var googleTranslate = require('google-translate')(apiKey)
      const translate = Meteor.wrapAsync(googleTranslate.translate, googleTranslate.translate)
      const translation = translate(text, fromLanguageCode, toLanguageCode)
      return translation.translatedText
    }
  },

  saveTranslation: function(translation) {
    console.assert(translation, "missing translation")
    console.assert(translation.languageCode, "missing translation.languageCode")
    if (!translation.status) {
      translation.status = 'pending'
    }
    Meteor.upsert({languageCode: translation.languageCode}, translation)
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
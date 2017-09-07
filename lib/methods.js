import {Signatures, Texts} from "./collection"
import {removeLinksFromMarkDown} from "./util";
import {getLanguageName} from "./data/languages";

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
      const text = removeLinksFromMarkDown(texts[textKey])
      if (!text) {
        return ""
      }

      const googleApiKey = process.env.GOOGLE_API_KEY
      if (!googleApiKey) {
        console.log("Missing environment variable GOOGLE_API_KEY, so I can't do google translations!")
        throw new Meteor.Error("Missing environment variable GOOGLE_API_KEY, so I can't do google translations!")
      }

      var googleTranslate = require('google-translate')(googleApiKey)
      const translate = Meteor.wrapAsync(googleTranslate.translate, googleTranslate.translate)

      const textLines = text.split('\n')
      let translatedText = ""
      textLines.forEach((textLine) => {
        if (textLine) {
          const translation = translate(textLine, fromLanguageCode, toLanguageCode)
          if (translation.translatedText) {
            translatedText = translatedText + translation.translatedText
          }
        }
        translatedText = translatedText + "\n"
      })

      return translatedText
    }
  },

  saveTranslation: function(translation) {
    console.assert(translation, "missing translation")
    console.assert(translation.languageCode, "missing translation.languageCode")
    translation.lastUpdated = new Date()
    Texts.upsert({languageCode: translation.languageCode}, {$set: translation})
  },
  
  saveText: function(languageCode, textKey, value) {
    console.assert(languageCode, "missing languageCode")
    console.assert(textKey, "missing textKey")

    if (Texts.findOne({languageCode: languageCode})) {
      let modifier = {
        lastUpdated: new Date()
      }
      if (value) {
        modifier[textKey] = value
        Texts.update({languageCode: languageCode}, {$set: modifier})
      } else {
        modifier[textKey] = 0
        Texts.update({languageCode: languageCode}, {$unset: modifier})
      }
    } else {
      let modifier = {
        status: 'started',
        languageCode: languageCode,
        languageName: getLanguageName(languageCode),
        lastUpdated: new Date()
      }
      if (value) {
        modifier[textKey] = value
      }

      Texts.insert(modifier)
    }
  },

  setTranslationStatus: function(languageCode, newStatus) {
    console.assert(languageCode, "missing languageCode")
    console.assert(newStatus, "missing newStatus")

    const texts = Texts.findOne({languageCode: languageCode})
    console.assert(texts, "There is no translation language " + languageCode)

    const oldStatus = texts.status
    if (oldStatus == 'published' || newStatus == 'published') {
      if (!Roles.userIsInRole(this.userId, "admin")) {
        throw new Meteor.Error("You must be admin to publish or unpublish a translation")
      }
    }

    Texts.update({languageCode: languageCode}, {$set: {status: newStatus, lastUpdated: new Date()}})


    if (newStatus == 'pending') {
      sendToSlack('New translation ready for review: ' + ISOLanguages.getName(languageCode) + "\n" + Meteor.absoluteUrl() + languageCode + "/reviewText")
    }
    if (newStatus == 'published') {
      sendToSlack('New translation published: ' + ISOLanguages.getName(languageCode) + "\n" + Meteor.absoluteUrl() + languageCode)
    }

  }
  
})

function sendToSlack(text) {
  if (Meteor.isClient) {
    return
  }

  let slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  if (slackWebhookUrl) {
    const Slack = require('slack-node')
    const slack = new Slack();
    slack.setWebhook(slackWebhookUrl)
    slack.webhook({
      text: text
    }, function(err, response) {
      if (err) {
        console.log("Failed to send message to slack. Ignoring and moving on.", err)
      } else {
        console.log("Sent message to slack: " + text)
      }
    })

  } else {
    console.log("Set environment variable SLACK_WEBHOOK_URL if you want to send messages to slack.")
    console.log("I was going to send this on slack: " + text)
  }

}
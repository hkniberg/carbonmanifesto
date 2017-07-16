export const Texts = new Meteor.Collection("texts")
Texts.attachSchema(
  new SimpleSchema({
    languageCode: {
      type: String
    },

    header: {type: String},
    background: {type: String},
    pledge: {type: String},
    bullet1: {type: String},
    bullet2: {type: String},
    bullet3: {type: String},
    footnote: {type: String},
    signTheManifesto: {type: String}
  })
)

export const Signatures = new Meteor.Collection("signatures")
Signatures.attachSchema(
  new SimpleSchema({
      languageCode: {
          type: String
      },

      name: {type: String},
      email: {type: String, optional: true},
      country: {type: String, optional: true},
      mailingList: {type: Boolean},
      info: {type: String, optional: true},
      comments: {type: String, optional: true},
      date: {type: Date, autoValue: function() {return new Date()}}
  })
)

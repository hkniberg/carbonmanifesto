export const Texts = new Meteor.Collection("texts")
export const textKeys = ['header', 'background', 'pledge', 'bullet1', 'bullet2', 'bullet3']

Texts.attachSchema(
  new SimpleSchema({
    languageCode: {type: String},
    languageName: {type: String},
    status: {type: String},
    header: {type: String, optional: true},
    background: {type: String, optional: true},
    pledge: {type: String, optional: true},
    bullet1: {type: String, optional: true},
    bullet2: {type: String, optional: true},
    bullet3: {type: String, optional: true},
    footnote: {type: String, optional: true},
    signTheManifesto: {type: String, optional: true}
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
      countryName: {type: String, optional: true},
      countryCode: {type: String, optional: true},
      info: {type: String, optional: true},
      comments: {type: String, optional: true},
      date: {type: Date, autoValue: function() {return new Date()}}
  })
)

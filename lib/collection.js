export const Texts = new Meteor.Collection("texts")
export const textKeys = [
  'header', 
  'background', 
  'pledge', 
  'bullet1', 
  'bullet2', 
  'bullet3', 
  'footnote', 
  'signIt',
  'youSignedIt',
  'joinMailingList',
  'name',
  'country',
  'selectOne',
  'aboutYou',
  'aboutYouPlaceholder',
  'comments',
  'yourNameWillBeListed',
  'pleaseWriteYourName',
  'pleaseWriteYourEmail',
  'somethingWentWrong',
  'closeForm',
  'emailAddress',
  'emailAddressInfo',
  'yesPlease',
  'noThanks',
  'signatoriesInTotal',
  'latestSignatories'

]

Texts.attachSchema(
  new SimpleSchema({
    lastUpdated: {type: Date, optional: true},
    languageCode: {type: String},
    languageName: {type: String},
    status: {type: String, defaultValue: 'started'},
    header: {type: String, optional: true},
    background: {type: String, optional: true},
    pledge: {type: String, optional: true},
    bullet1: {type: String, optional: true},
    bullet2: {type: String, optional: true},
    bullet3: {type: String, optional: true},
    footnote: {type: String, optional: true},
    signIt: {type: String, optional: true},
    youSignedIt: {type: String, optional: true},
    joinMailingList: {type: String, optional: true},
    name: {type: String, optional: true},
    country: {type: String, optional: true},
    selectOne: {type: String, optional: true},
    aboutYou: {type: String, optional: true},
    aboutYouPlaceholder: {type: String, optional: true},
    comments: {type: String, optional: true},
    yourNameWillBeListed: {type: String, optional: true},
    pleaseWriteYourName: {type: String, optional: true},
    pleaseWriteYourEmail: {type: String, optional: true},
    somethingWentWrong: {type: String, optional: true},
    closeForm: {type: String, optional: true},
    emailAddress: {type: String, optional: true},
    emailAddressInfo: {type: String, optional: true},
    yesPlease: {type: String, optional: true},
    noThanks: {type: String, optional: true},
    signatoriesInTotal: {type: String, optional: true},
    latestSignatories: {type: String, optional: true},
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

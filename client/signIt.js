import {countries} from "../lib/data/countries"
import {getTexts} from "./cms";
import {getCurrentLanguageCode} from "./cms";

const showSignatureFormVar = new ReactiveVar(false)
const showEmailFormVar = new ReactiveVar(false)
const joinMailingListVar = new ReactiveVar(true)
const nameMissingVar = new ReactiveVar(false)
const emailMissingVar = new ReactiveVar(false)
const somethingWentWrongVar = new ReactiveVar(false)
const signatureIdVar = new ReactiveVar(null)

Template.signIt.onRendered(function() {
  if (getTexts().status != "published") {
    showSignatureFormVar.set(true)
  }
})

Template.signIt.helpers({
  showSignatureForm() {
    return showSignatureFormVar.get()
  },
  showEmailForm() {
    return showEmailFormVar.get()
  },
  joinMailingList() {
    return joinMailingListVar.get()
  },
  nameMissing() {
    return nameMissingVar.get()
  },
  emailMissing() {
    return emailMissingVar.get()
  },
  somethingWentWrong() {
    return somethingWentWrongVar.get()
  },
  showSignItButton() {
    return !showSignatureFormVar.get() && !showEmailFormVar.get() && !signatureIdVar.get()
  },
  hasSigned() {
    return signatureIdVar.get()
  },
  countries() {
    return countries
  }
})


Template.signIt.events({
  "click .showForm"() {
    showSignatureFormVar.set(true)
  },
  
  "click .signButton"() {
    submitSignatureForm()
  },

  "click .joinMailingListButton"() {
    joinMailingList()
  },

  "click .cancelButton"() {
    reset()
  }
})

function submitSignatureForm() {
  nameMissingVar.set(false)
  emailMissingVar.set(false)
  somethingWentWrongVar.set(false)

  const name = getFormValue("name")
  if (!name) {
    nameMissingVar.set(true)
    return
  }

  

  const signature = {
    name: name,
    languageCode: "en",
    info: getFormValue("info"),
    comments: getFormValue("comments")
  }
  
  const countryCode = getFormValue("country")
  if (countryCode) {
    signature.countryCode = countryCode
    signature.countryName = getCountryName(countryCode)
  }

  signature.languageCode = getCurrentLanguageCode()

  console.log("signature", signature)


  Meteor.call("sign", signature, function(err, signatureId) {
    if (err) {
      console.log("error while submitting:", err)
      somethingWentWrongVar.set(true)
    } else {
      console.log("Setting signatureIdVar", signatureId)
      signatureIdVar.set(signatureId)
      showSignatureFormVar.set(false)
      showEmailFormVar.set(true)
    }
  })
}

function joinMailingList() {
  const email = getFormValue("email")
  if (!email) {
    emailMissingVar.set(true)
    return
  }
  Meteor.call("setEmail", signatureIdVar.get(), email, function(err) {
    if (err) {
      console.log("error while submitting:", err)
      somethingWentWrongVar.set(true)
    } else {
      reset()
    }     
  })
}

function reset() {
  showSignatureFormVar.set(false)
  showEmailFormVar.set(false)

  nameMissingVar.set(false)
  emailMissingVar.set(false)
  somethingWentWrongVar.set(null)
}

function getFormValue(name) {
  const val = $("#" + name).val()
  if (val) {
    return val.trim()
  } else {
    return val
  }
}

function getCountryName(countryCode) {
  return $("#country option[value='" + countryCode + "']").text()
}

function getFormText(name) {
}

const showSignatureFormVar = new ReactiveVar(false)
const showEmailFormVar = new ReactiveVar(false)
const joinMailingListVar = new ReactiveVar(true)
const nameMissingVar = new ReactiveVar(false)
const emailMissingVar = new ReactiveVar(false)
const somethingWentWrongVar = new ReactiveVar(false)
const signatureIdVar = new ReactiveVar(null)

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
    country: getFormValue("country"),
    info: getFormValue("info"),
    comments: getFormValue("comments")
  }

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


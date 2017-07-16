const editingVar = new ReactiveVar(false)
const joinMailingListVar = new ReactiveVar(true)
const nameMissingVar = new ReactiveVar(false)
const emailMissingVar = new ReactiveVar(false)
const somethingWentWrongVar = new ReactiveVar(false)
const signatureReceivedVar = new ReactiveVar(false)

Template.signIt.helpers({
  editing() {
    return editingVar.get()
  },
  "joinMailingList"() {
    return joinMailingListVar.get()
  },
  "nameMissing"() {
    return nameMissingVar.get()
  },
  "emailMissing"() {
    return emailMissingVar.get()
  },
  "somethingWentWrong"() {
    return somethingWentWrongVar.get()
  },
  "signatureReceived"() {
    return signatureReceivedVar.get()
  }

})


Template.signIt.events({
  "click .showForm"() {
    editingVar.set(true)
  },

  "change #joinMailingList"() {
    joinMailingListVar.set(isJoinMailingListChecked())
  },
  
  "click .submitForm"() {
    submitForm()
  },
  
  "click .cancelForm"() {
    nameMissingVar.set(false)
    emailMissingVar.set(false)
    editingVar.set(false)
  }
})

function submitForm() {
  nameMissingVar.set(false)
  emailMissingVar.set(false)
  somethingWentWrongVar.set(false)
  signatureReceivedVar.set(false)

  const name = getFormValue("name")
  if (!name) {
    nameMissingVar.set(true)
    return
  }

  let email
  if (isJoinMailingListChecked()) {
    email = getFormValue("email")
    if (!email) {
      emailMissingVar.set(true)
      return
    }
  }


  const signature = {
    name: name,
    languageCode: "en",
    country: getFormValue("country"),
    mailingList: isJoinMailingListChecked(),
    info: getFormValue("info"),
    comments: getFormValue("comments"),
    email: email
  }

  Meteor.call("sign", signature, function(err) {
    if (err) {
      console.log("error while submitting:", err)
      somethingWentWrongVar.set(true)
    } else {
      editingVar.set(false)
      signatureReceivedVar.set(true)
    }
  })
}

function isJoinMailingListChecked() {
  return $("#joinMailingList").prop("checked")
}

function getFormValue(name) {
  const val = $("#" + name).val()
  if (val) {
    return val.trim()
  } else {
    return val
  }
}


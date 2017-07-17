import {Signatures} from "./collection"

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
  }
})
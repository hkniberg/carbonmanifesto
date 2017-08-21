import {Texts} from "../lib/collection"

Meteor.startup(function() {

  if (!Texts.findOne()) {
    Texts.insert({
      languageCode: "en",
      header: "Zero Carbon Manifesto",
      background: "Background: Global warming is the biggest threat to humanity [ref](http://ipcc.ch/pdf/assessment-report/ar5/syr/AR5_SYR_FINAL_SPM.pdf).",
      pledge: "I hereby pledge to reduce my personal lifetime carbon footprint to zero.",
      bullet1: "I will, to the best of my knowledge and ability,...",
      bullet2: "I realize this alone doesn’t solve the climate problem, ...",
      bullet3: "I make this pledge here, in the open, to increase the likelihood tha...",
      footnote: "This could include any type of action such as...",
      signTheManifesto: "Sign the manifesto"
    })
  }
})



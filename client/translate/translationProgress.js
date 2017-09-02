import {textKeys} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";
import {isLinkCountIncorrect} from "../cms";
import {Texts} from "../../lib/collection"
import {getTranslatedTextCount} from "../cms";

Template.translationProgress.onRendered(function() {
  this.autorun(function() {
    //Autorunning this so that the progress bar gets updated
    //when the texts are updated
    const languageCode = getCurrentLanguageCode()
    Texts.findOne({languageCode: languageCode})
    $('.progress .progress-bar').progressbar({
      display_text: 'center',
      use_percentage: false,
      amount_format: function(part, total) {return part + ' / ' + total + " texts translated"}
    })
  })
})

Template.translationProgress.helpers({
  translatedTexts() {
    return getTranslatedTextCount()
  },

  totalTexts() {
    return textKeys.length
  }
})

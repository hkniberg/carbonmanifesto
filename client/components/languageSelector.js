import {Texts} from "../../lib/collection"
import {getCurrentLanguageCode} from "../cms";
import {setCurrentLanguageCode} from "../cms";


Template.languageSelector.helpers({
  languages() {
    return Texts.find(
      {status: 'published'},
      {
        fields: {status: 1, languageCode: 1, languageName: 1},
        sort: {languageName: 1}
      }
    )
  },

  selected() {
    const givenLanguageCode = this.languageCode
    const currentLanguageCode = getCurrentLanguageCode()
    if (givenLanguageCode == currentLanguageCode) {
      return "selected"
    }
  }
})

Template.languageSelector.events({
  "change .languageSelector"() {
    const languageCode = $(".languageSelector").val()
    setCurrentLanguageCode(languageCode)
  },

  "click .translate"() {
    Router.go("/translate")
  }


})
import {Texts} from "../../lib/collection"
import {setCurrentLanguage} from "../cms"
import {getLanguageNamePairs} from "../../lib/data/languages";

Template.translate.helpers({
  todo() {
    return getLanguages().filter(function(language) {
      return !language.status
    })
  },
  started() {
    return getLanguages().filter(function(language) {
      return language.status == 'started'
    })
  },
  pending() {
    return getLanguages().filter(function(language) {
      return language.status == 'pending'
    })
  },
  published() {
    return getLanguages().filter(function(language) {
      return language.status == 'published'
    })
  }
})

function getLanguages() {
  const namePairs = getLanguageNamePairs()
  const languages = namePairs.map(function(namePair) {
    const languageCode = namePair[0]
    const languageName = namePair[1]
    const texts = Texts.findOne({languageCode: languageCode.toLowerCase()})
    if (texts) {
      return texts
    } else {
      return {languageCode, languageName}
    }
  })
  return languages.sort((a, b) => {
    return a.languageName.localeCompare(b.languageName)
  })

}

Template.translate.events({
  "click .languageButton"(event) {
    const languageCode = this.languageCode
    const texts = Texts.findOne({languageCode: languageCode})
    if (texts && texts.status == 'published') {
      Router.go('/' + languageCode)
    } else {
      Router.go('/' + languageCode + '/editText')
    }
  }
})


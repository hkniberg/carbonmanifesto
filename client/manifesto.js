import {getTexts} from "./cms"

Template.manifesto.onRendered(function() {
  window.scrollTo(0, 0)
})

Template.manifesto.helpers({
  isPreview() {
    const texts = getTexts()
    return texts.status != "published"
  }
})
import {getTexts} from "./cms"

Template.manifesto.helpers({
  isPreview() {
    const texts = getTexts()
    return texts.status != "published"
  }
})
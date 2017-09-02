/**
 * Strips links from a markdown string.
 * See /test/util.tests.js
 */
export function removeLinksFromMarkDown(text) {
  if (text == undefined || text == null) {
    return null
  }
  return text.replace(/\]\([^)]*\)/g, "]")
}

/**
 * Counts how many links are in the given markdown string
 */
export function countLinks(text) {
  if (!text) {
    return 0
  }

  const match = text.match(/\[[^\]]*\]/g)
  if (!match) {
    return 0
  }
  return match.length
}

/**
 * Copies all links from one text to another.
 * Asserts that both texts contain the same number of links.
 *
 * So if fromText looks like this: [a](google.com)
 * ... and toText looks like this: [b]
 * ... then the result will be [b](google.com)
 *
 * See /test/util.tests.js
 */
export function copyLinks(fromText, toText) {
  if (!fromText) {
    fromText = ""
  }
  if (!toText) {
    toText = ""
  }

  if (countLinks(fromText) != countLinks(toText)) {
    //"Hey, these two texts don't contain the same number of links!", fromText, toText)
    return toText
  }

  const fromLinks = fromText.match(/\[[^\]]*\]\([^)]*\)/g)
  if (!fromLinks) {
    return toText
  }
  const toLinks = toText.match(/\[[^\]]*\]/g)

  for (let i = 0; i < fromLinks.length; ++i) {
    let fromLink = fromLinks[i] //  [a](google.com)
    const toLink = toLinks[i]  //     [b]
    const fromLinkDescription = fromLink.match(/\[([^\]]*)\]/g)   //  [a]
    const newToLink = fromLink.replace(fromLinkDescription, toLink) // [b](google.com)
    toText = toText.replace(toLink, newToLink)
  }
  return toText
}

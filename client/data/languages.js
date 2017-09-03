export const rightToLeftLanguages = ["he"] //TODO add all RTL languages

export function isRightToLeftLanguageCode(languageCode) {
  return rightToLeftLanguages.includes(languageCode)
}

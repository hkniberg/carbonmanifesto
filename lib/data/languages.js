export const rightToLeftLanguages = ["he", "ar", "fa", "ur", "yi"] //TODO add all RTL languages

export const specialLanguages = [
  ["dalmal", "Dalmål"],
  ["sindarin", "Sindarin (Elvish)"],
  ["klingon", "Klingon"],
  ["dothraki", "Dothraki"],
  ["navi", "Na’vi"],
  ["lolcal", "LOLcat"]
]

export function isRightToLeftLanguageCode(languageCode) {
  return rightToLeftLanguages.includes(languageCode)
}

export function getLanguageNamePairs() {
  return ISOLanguages.getNamePairs().concat(specialLanguages)
}

export function getLanguageName(languageCode) {
  let languageName
  specialLanguages.forEach((language) => {
    if (language[0] == languageCode) {
      languageName = language[1]
    }
  })
  if (languageName) {
    return languageName
  }

  return ISOLanguages.getName(languageCode)
}
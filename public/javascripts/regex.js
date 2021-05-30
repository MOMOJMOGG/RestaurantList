module.exports = regularExpressResult = {
  matchEnglishName: (str) => {
    const result = str.match(/[a-z\s]+/i)
    if (!result || result[0] !== str) {
      return false
    } else {
      return true
    }
  },
  matchPhone: (str) => {
    const result = str.match(/[0-9\s-]+/i)
    if (!result || result[0] !== str) {
      return false
    } else {
      return true
    }
  }
}
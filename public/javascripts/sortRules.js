const sortMap = {
  'asc': { _id: 'asc' },
  'desc': { _id: 'desc' },
  'n-asc': { name_en: 'asc' },
  'n-desc': { name_en: 'desc' },
  'category-asc': { category: 'asc' },
  'region-asc': { location: 'asc' }
}

function sortRules(sortOption) {
  return sortMap[sortOption]
}

module.exports = sortRules
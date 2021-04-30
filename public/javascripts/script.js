const restCategorySelector = document.querySelector('#rest-category')

if (restCategorySelector != null) {
  restCategorySelector.addEventListener('change', event => {
    const otherCategory = document.querySelector('.other-category')
    if (event.target.value === '12') {
      if (otherCategory.classList.contains('invisible')) {
        otherCategory.classList.toggle('invisible')
      }
    } else {
      if (!otherCategory.classList.contains('invisible')) {
        otherCategory.classList.toggle('invisible')
      }
    }
  })
}



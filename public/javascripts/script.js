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

const cardDeck = document.querySelector('.card-deck')

if (cardDeck != null) {
  cardDeck.addEventListener('click', event => {
    if (event.target.classList.contains('del-btn')) {
      const targetId = event.target.dataset.id

      $('#save-btn-link').attr("action", `/restaurants/${targetId}/delete`)
      $('#save-btn-link').attr("method", "POST")
      $('#deleteWarningModal').modal('show')
    }
  })
}



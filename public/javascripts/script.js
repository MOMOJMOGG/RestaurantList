const cardDeck = document.querySelector('.card-deck')

if (cardDeck != null) {
  cardDeck.addEventListener('click', event => {
    if (event.target.classList.contains('del-btn')) {
      const targetId = event.target.dataset.id

      $('#save-btn-link').attr("action", `/restaurants/${targetId}?_method=DELETE`)
      $('#save-btn-link').attr("method", "POST")
      $('#deleteWarningModal').modal('show')
    }
  })
}
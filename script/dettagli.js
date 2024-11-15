const url = 'https://striveschool-api.herokuapp.com/api/product'

const address = new URLSearchParams(window.location.search)

const productId = address.get('productId')
console.log('productId', productId)

fetch(url + '/' + productId, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTcxNThhZDEyOTAwMTU4NzZiZTIiLCJpYXQiOjE3MzE2NjM2MzcsImV4cCI6MTczMjg3MzIzN30.mGGxTYXiUuIA2u1vm2vPoqnqsfVTqtnGLYNpIGuIDhg',
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero dei dettagli del prodotto')
    }
  })
  .then((singleProduct) => {
    console.log('singleProduct', singleProduct)
    // recupero il riferimento della colonna nel DOM
    const col = document.getElementById('card-container')
    col.innerHTML = `
        <div class="card">
            <img src="https://www.adobe.com/creativecloud/photography/discover/media_15955bf89f635a586d897b5c35f7a447b495f6ed7.jpeg?width=1200&format=pjpg&optimize=medium" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${singleProduct.name}</h5>
                <p class="card-text">${singleProduct.description}</p>
                <p class="card-text">${singleProduct.price}€</p>
                <a class="btn btn-warning" href="./backoffice.html?productId=${product._Id}">MODIFICA</a>
                <button class="btn btn-danger" onclick="deleteProduct()">ELIMINA</button>
            </div>
        </div>
      `
  })
  .catch((error) => {
    console.log('ERROR', error)
  })

const deleteConcert = function () {
  fetch(url + '/' + productId, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // ELIMINAZIONE AVVENUTA CON SUCCESSO
        alert('Concerto eliminato!')
        // redirect in homepage
        window.location.assign('./home_page.html')
      } else {
        throw new Error('Errore cancellazione prodotto')
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

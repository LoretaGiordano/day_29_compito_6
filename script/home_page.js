const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

const url = 'https://striveschool-api.herokuapp.com/api/product/'

// Prima recupera i prodotti esistenti
fetch(url, {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTcxNThhZDEyOTAwMTU4NzZiZTIiLCJpYXQiOjE3MzE2NjM2MzcsImV4cCI6MTczMjg3MzIzN30.mGGxTYXiUuIA2u1vm2vPoqnqsfVTqtnGLYNpIGuIDhg',
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero dei prodotti')
    }
  })
  .then((products) => {
    console.log('Prodotti esistenti:', products)
    const row = document.getElementById('product-row')
    products.forEach((product) => {
      // Cambiato "concert" in "product"
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCol.innerHTML = `
            <div class="card">
                <img src="https://www.adobe.com/creativecloud/photography/discover/media_15955bf89f635a586d897b5c35f7a447b495f6ed7.jpeg?width=1200&format=pjpg&optimize=medium" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}€</p> <!-- Rimosso la parentesi graffa in eccesso -->
                    <a href="./details.html?concertId=${product._id}" class="btn btn-primary">Vai ai dettagli!</a>
                </div>
            </div>
        `
      row.appendChild(newCol)
    })
  })
  .catch((error) => {
    console.error('ERROR', error)
  })

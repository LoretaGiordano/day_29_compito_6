const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

class product {
  constructor(_name, _description, _price) {
    this.name = _name
    this.description = _description
    this.price = _price
  }
}

const url = 'https://striveschool-api.herokuapp.com/api/product'

const addressBarContent = new URLSearchParams(window.location.search)
const productId = addressBarContent.get('productId')

if (productId) {
  fetch(url + '/' + productId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero')
      }
    })
    .then((singleProduct) => {
      document.getElementById('name').value = singleProduct.name
      document.getElementById('description').value = singleProduct.description
      document.getElementById('price').value = singleProduct.price
    })
    .catch((err) => console.log('errore', err))
} else {
}

const form = document.getElementById('product-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const createdproduct = new product(
    nameInput.value,
    descriptionInput.value,
    priceInput.value
  )
  console.log('product pronto', createdproduct)

  let methodToUse
  if (productId) {
    methodToUse = 'PUT'
  } else {
    methodToUse = 'POST'
  }

  let URLToUse
  if (productId) {
    URLToUse = url + '/' + productId
  } else {
    URLToUse = url
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(createdproduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTcxNThhZDEyOTAwMTU4NzZiZTIiLCJpYXQiOjE3MzE2NjM2MzcsImV4cCI6MTczMjg3MzIzN30.mGGxTYXiUuIA2u1vm2vPoqnqsfVTqtnGLYNpIGuIDhg',
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('EVENTO SALVATO!')
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
      } else {
        throw new Error('Errore nel salvataggio del product')
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

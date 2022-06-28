import './reset.css'
import './style.css'

/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/

// update state
// render

type StoreItem = {
  id: number
  name: string
  price: number
  stock: number
  inCart: number
}

type State = {
  storeItems: StoreItem[]
}

let state: State = {
  storeItems: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.45,
      stock: 10,
      inCart: 0
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.15,
      stock: 2,
      inCart: 5
    },
    {
      id: 3,
      name: 'apple',
      price: 0.25,
      stock: 1,
      inCart: 0
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.25,
      stock: 1,
      inCart: 0
    }
  ]
}

// CAN I CALCULATE EVERYTHING I NEED BASED ON THE CURRENT STATE?
// If YES: Do not create more state, calculate it!
// If NO: Create more state

// Q: What store items are available? state.storeItems ✅
// Q: Which items are in my cart? ✅ filter state.storeItems
// Q: How many of each? ✅ item.inCart
// Q: What is the total? ✅ getTotal()
// Q: How do I get the image path for an item? ✅ getItemImagePath()

// input: item
// action: generates a path for this item's image
// output: the path
function getItemImagePath (item: StoreItem) {
  let id = String(item.id).padStart(3, '0')
  return `assets/icons/${id}-${item.name}.svg`
}

// input: nothing
// action: get the items that are in the cart
// output: the cart items
function getCartItems () {
  return state.storeItems.filter(item => item.inCart > 0)
}

// output: the current total
function getTotal () {}

function increaseQuantity (item: StoreItem) {
  if (item.stock === 0) return

  item.inCart++
  item.stock--
}

function decreaseQuantity (item) {
  if (item.inCart > 0) {
    item.inCart--
    item.stock++
  }
}

// // Rendering - approach 2: recreate/update only the dynamic parts
// // update the page
function renderStoreItems () {
  let storeUl = document.querySelector('.store--item-list')
  storeUl.textContent = ''

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement('li')

    let iconDiv = document.createElement('div')
    iconDiv.className = '.store--item-icon'

    let iconImg = document.createElement('img')
    iconImg.src = getItemImagePath(item)

    let addBtn = document.createElement('button')
    addBtn.textContent = `Add to cart (${item.stock})`
    addBtn.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    iconDiv.append(iconImg)
    storeItemEl.append(iconDiv, addBtn)
    storeUl.append(storeItemEl)
  }
}

function renderCartItems () {
  let cartUl = document.querySelector('.cart--item-list')
  cartUl.textContent = ''

  let cartItems = getCartItems()

  for (let item of cartItems) {
    let cartLi = document.createElement('li')

    let itemImg = document.createElement('img')
    itemImg.className = 'cart--item-icon'
    itemImg.src = getItemImagePath(item)
    itemImg.alt = item.name

    let itemNameP = document.createElement('p')
    itemNameP.textContent = item.name

    let removeBtn = document.createElement('button')
    removeBtn.className = 'quantity-btn remove-btn center'
    removeBtn.textContent = '-'
    removeBtn.addEventListener('click', function () {
      decreaseQuantity(item)
      render()
    })

    let quantitySpan = document.createElement('span')
    quantitySpan.className = 'quantity-text center'
    quantitySpan.textContent = String(item.inCart)

    let addBtn = document.createElement('button')
    addBtn.className = 'quantity-btn add-btn center'
    addBtn.textContent = '+'
    addBtn.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    cartLi.append(itemImg, itemNameP, removeBtn, quantitySpan, addBtn)
    cartUl.append(cartLi)
  }
}

function renderTotal () {
  // update the total text
}

function render () {
  renderStoreItems()
  renderCartItems()
  renderTotal()
}

render()

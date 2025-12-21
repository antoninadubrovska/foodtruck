
import { getMenu } from "../api.js"
import { addToCart } from "../store.js"
import { updateCartCounter, renderCart } from "./cart.js"

const menuItemsContainer = document.querySelector('.menu-items-container')
const menuContainer = document.querySelector(".menu-container")
const cartPage = document.getElementById("cart-page")
const receiptSection = document.getElementById("receipt-page")
const orderStatusPage = document.getElementById("order-status-page")

// export function showMenuPage() {
//     menuContainer.classList.remove("hidden")
//     cartPage.classList.add("hidden")
//     receiptSection.classList.add("hidden")
// }

//menu always wins when called - authoritative
function showMenuPage() {
	menuContainer.classList.remove("hidden")
	cartPage.classList.add("hidden")
	receiptSection.classList.add("hidden")
	orderStatusPage.classList.add("hidden")
  }

async function setupMenu() {
	menuItemsContainer.innerHTML = ''
    const menuData = await getMenu()
    if (!menuData || !menuData.items) {
        menuItemsContainer.innerHTML = "Could not load the menu :("
        return
    }

    const wontons = menuData.items.filter(i => i.type === 'wonton')
    const dips = menuData.items.filter(i => i.type === 'dip')
    const drinks = menuData.items.filter(i => i.type === 'drink')

    renderWontonSection(wontons)
    renderGroupSection('Dipsås', dips)
    renderGroupSection('Drink', drinks)
}

const cartIcon = document.querySelector(".cart-icon")
function showCartPage() {
    menuContainer.classList.add("hidden")
    cartPage.classList.remove("hidden")
    receiptSection.classList.add("hidden")
    renderCart()
}

cartIcon.addEventListener("click", showCartPage)

function renderWontonSection(items) {
    const section = document.createElement('section')
    section.classList.add('menu-section')
    items.forEach(item => section.appendChild(createMenuItem(item)))
    menuItemsContainer.appendChild(section)
}

function renderGroupSection(title, items) {
    if (!items.length) return
    const section = document.createElement('section')
    section.classList.add('menu-section')

    const card = document.createElement('div')
    card.classList.add('menu-item')

    const header = document.createElement('div')
    header.classList.add('menu-header')

	const titleEl = document.createElement('h3')
	titleEl.classList.add("menu-item-name")
    titleEl.textContent = title
	const dots = document.createElement('span')
	dots.classList.add('menu-dots')
	const priceEl = document.createElement('p')
	priceEl.classList.add("menu-item-price")
    priceEl.textContent = `${items[0].price} SEK`

    header.append(titleEl, dots, priceEl)
    card.appendChild(header)

    const buttonsWrap = document.createElement('div')
	buttonsWrap.classList.add('group-buttons-wrap')

    items.forEach(item => {
		const btn = document.createElement('button')


		if (title === 'Dipsås') {
			btn.textContent = item.name.toLowerCase()
		} else {
			btn.textContent = item.name
		}


		const card = createMenuItem(item)

		btn.addEventListener('click', () => {
			addToCart(item)
			updateCartCounter()
		})
        buttonsWrap.appendChild(btn)
    })
    card.appendChild(buttonsWrap)
    section.appendChild(card)
    menuItemsContainer.appendChild(section)
}

function createMenuItem(item) {
    const el = document.createElement("div")
    el.classList.add("menu-item", `item-${item.type}`)

    const header = document.createElement("div")
    header.classList.add("menu-header")

    const name = document.createElement("h3")
    name.classList.add("menu-item-name")
    name.textContent = item.name

    const dots = document.createElement("span")
    dots.classList.add("menu-dots")

    const price = document.createElement("p")
    price.classList.add("menu-item-price")
    price.textContent = `${item.price} SEK`

    header.append(name, dots, price)
    el.appendChild(header)

    const desc = document.createElement("p")
    desc.classList.add("menu-item-description")
    desc.textContent = item.description
    el.appendChild(desc)

	el.addEventListener("click", () => {
		addToCart(item)
		updateCartCounter()

		// If cart page is visible, update immediately
		if (!cartPage.classList.contains("hidden")) {
			renderCart()
		}
	})

    return el
}
export { showMenuPage, setupMenu }
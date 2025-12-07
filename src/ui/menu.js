import { getMenu } from '../api.js'

const menuContainer = document.querySelector('.menu-items-container')
const menuItemContainer = document.querySelector('.menu-item')

async function setupMenu() {

	// clear before rendering
	menuContainer.innerHTML = ''
	// 	wait for the menu data - call API
	const menuData = await getMenu()
	// safety
	if (!menuData) {
		menuContainer.innerHTML = 'Could not load the menu :('
		return
	}

	// group the 3 types of menu items
	const wontons = menuData.items.filter(i => i.type === 'wonton')
	const dips = menuData.items.filter(i => i.type === 'dip')
	const drinks = menuData.items.filter(i => i.type === 'drink')

	// render each

	// Wonton
	renderWontonSection(wontons)
	// Dip
	renderDipAndDrinkGroup('Dipsås', dips, dips[0].price)
	// Drink
	renderDipAndDrinkGroup('Drink', drinks, drinks[0].price)
}

// Wonton
function renderWontonSection(wontons) {
    const section = document.createElement('section')
    section.classList.add('menu-section')

    wontons.forEach(item => {
        const menuItem = createWontonItem(item)
        section.appendChild(menuItem)
    })
    menuContainer.appendChild(section)
}


// Dip and Drink
function renderDipAndDrinkGroup(title, items, price) {

	const section = document.createElement('section')
    section.classList.add('menu-section')

    const card = document.createElement('div')
    card.classList.add('menu-item')

    // Header
    const header = document.createElement('div')
    header.classList.add('menu-header')

    const titleEl = document.createElement('h3')
    titleEl.classList.add('menu-item-name')
    titleEl.textContent = title

    const dots = document.createElement('span')
    dots.classList.add('menu-dots')

    const priceEl = document.createElement('p')
    priceEl.classList.add('menu-item-price')
	priceEl.textContent = `${price} SEK`

	const buttonsWrap = document.createElement('div')
	buttonsWrap.classList.add('group-buttons-wrap')

    header.appendChild(titleEl)
    header.appendChild(dots)
    header.appendChild(priceEl)
	card.appendChild(header)
	card.appendChild(buttonsWrap)
	// buttonsWrap.appendChild(btn)



	// Buttons



    items.forEach(item => {
        const btn = document.createElement('button')
        btn.classList.add('group-button')
		btn.textContent = item.name

		// lowercase for dips
		if (title === 'Dipsås') {
			btn.style.textTransform = 'lowercase'
		} else {
			btn.style.textTransform = 'none'
		}

        btn.addEventListener('click', () => {
            // console.log('Add to cart:', item)
        })

		// card.appendChild(btn)
		buttonsWrap.appendChild(btn)
	})

	section.appendChild(card)
	menuContainer.appendChild(section)

}


//  Wonton menu item creation
function createWontonItem(item) {

    const menuItem = document.createElement('div')
	menuItem.classList.add('menu-item')
	menuItem.classList.add(`item-${item.type}`)


    const header = document.createElement('div')
    header.classList.add('menu-header')

    const name = document.createElement('h3')
    name.classList.add('menu-item-name')
    name.textContent = item.name

    const dots = document.createElement('span')
    dots.classList.add('menu-dots')

    const price = document.createElement('p')
    price.classList.add('menu-item-price')
    price.textContent = `${item.price} SEK`

    const desc = document.createElement('p')
    desc.classList.add('menu-item-description')
    desc.textContent = item.description;

    header.appendChild(name)
    header.appendChild(dots)
    header.appendChild(price)

    menuItem.appendChild(header)
    menuItem.appendChild(desc)

    return menuItem
}


export { setupMenu }
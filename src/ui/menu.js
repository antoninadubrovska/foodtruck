import { getMenu } from "../api.js";

const menuContainer = document.querySelector('.menu-items-container');
const menuItemContainer = document.querySelector('.menu-item');

async function setupMenu() {

	// clear before rendering
	menuContainer.innerHTML = ''

	// 	wait for the menu data - call API
	const menuData = await getMenu()

	// safety
	if (!menuData) {
		menuContainer.innerHTML = "Could not load menu :("
		return
	  }
	//  loop through menuData.items and render
	menuData.items.forEach(item => {
		console.log("TYPE:", item.type) // to check
    	console.log("CLASS WILL BE:", `item-${item.type.toLowerCase()}`) // to check
		const menuItem = document.createElement('div')
		menuItem.classList.add('menu-item')
		menuItem.classList.add(`item-${item.type}`) // distinguish by type for styling

	// 	menuItem.innerHTML = `
	// 	<h3>${element.name}</h3>
	// 	<p>SEK ${element.price}</p>
	// 	<p>${element.description}</p>

	// 	`

	// HEADER (name and price)
    const header = document.createElement('div')
    header.classList.add('menu-header')

    const nameMenuItem = document.createElement('h3')
		nameMenuItem.classList.add('menu-item-name')
		// nameMenuItem.textContent = item.name.toUpperCase()
	nameMenuItem.textContent = item.name

	// DOTS element
	const dots = document.createElement('span')
	dots.classList.add('menu-dots')

    const priceMenuItem = document.createElement('p')
    priceMenuItem.classList.add('menu-item-price')
    priceMenuItem.textContent = ` ${item.price} SEK`

    // DESCRIPTION
    const descriptionMenuItem = document.createElement('p')
    descriptionMenuItem.classList.add('menu-item-description')
    descriptionMenuItem.textContent = item.description

    // menuItem structure
	header.appendChild(nameMenuItem)
	header.appendChild(dots)
	header.appendChild(priceMenuItem)


    menuItem.appendChild(header)
    menuItem.appendChild(descriptionMenuItem)

    // Click to add to cart
    menuItem.addEventListener('click', () => {
    console.log("Add to cart:", item)
		// TODO add ToCart(item);
		// TODO move
    });

		//  Add the whole item to the container
		menuContainer.appendChild(menuItem)
	});

}
export { setupMenu }
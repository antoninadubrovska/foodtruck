
import { getCartItems, getCartCount, clearCart, updateQuantity, removeFromCart } from "../store.js"
import { submitOrder } from "../order.js"
import { showOrderStatus } from "./success.js"
import { showMenuPage } from "./menu.js"



const cartPage = document.getElementById("cart-page")
const cartContainer = document.getElementById("cart-items")
const cartTotalEl = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")



export function renderCart() {
	const items = getCartItems()
	cartContainer.innerHTML = ""



	if (!items.length) {
		cartContainer.innerHTML =`
		<p class="cart-empty-msg"> Din varukorg är tom. <br>Klicka på kundvagnsikonen för att gå tillbaka till menyn.</p>`
		cartTotalEl.innerHTML = ""; // Clear previous total
		checkoutBtn.disabled = true // Disable checkout button
		return
	}

	let total = 0
	checkoutBtn.disabled = false // Enable checkout button

	items.forEach(item => {
		const row = document.createElement("div")
		row.classList.add("cart-item")

		row.innerHTML = `
            <div class="cart-left">
                <h4>${item.name}</h4>
                <div class="cart-controls">
                    <button class="minus">−</button>
                    <span class="qty">${item.quantity} stycken</span>
                    <button class="plus">+</button>
                </div>
            </div>
            <div class="cart-right">
                <span class="price">${item.price * item.quantity} SEK</span>
            </div>
        `

		// Create dots for this row TODO
		const dots = document.createElement("span")
		dots.classList.add("menu-dots")

		// Insert dots between plus button and price
		const cartRight = row.querySelector(".cart-right")
		row.insertBefore(dots, cartRight)


		// MINUS BUTTON
		row.querySelector(".minus").addEventListener("click", () => {
			if (item.quantity > 1) {
				updateQuantity(item.id, item.quantity - 1)
			} else {
				removeFromCart(item.id)
			}
			renderCart()
			updateCartCounter()
		})


		// PLUS BUTTON
		row.querySelector(".plus").addEventListener("click", () => {
			updateQuantity(item.id, item.quantity + 1)
			renderCart()
			updateCartCounter()
		})



		cartContainer.appendChild(row)
		total += item.price * item.quantity
	})

	cartTotalEl.textContent = `${total} SEK`

	cartTotalEl.innerHTML = `
	<div class="cart-total-inner">
		<span class="label"> TOTALT</span>
		<span class="placeholder"></span>
		<span class='moms-info'>inkl. 20% moms </span>

		<span class="amount">${total} SEK</span>
	</div>
	`
}

export function updateCartCounter() {
	const badge = document.querySelector(".cart-count")
	badge.textContent = getCartCount()
}

export function setupCart() {
	renderCart()
	updateCartCounter()

	// back to menu
	const cartBackImg = cartPage.querySelector("img")
	cartBackImg.addEventListener("click", showMenuPage)

	checkoutBtn.addEventListener("click", async () => {

		const result = await submitOrder()

		if (result) {
			const { orderId, etaTime, curTime } = result
			console.log(orderId, etaTime, curTime)
			const diffMs = new Date(etaTime).getTime() - new Date(curTime).getTime()
			const minutes = Math.floor(diffMs / 60000)

			console.log('DIFF: ', minutes)

			if (!orderId) {
				console.error("Order failed or no orderId returned")
				return
			}

			clearCart()
			renderCart()
			updateCartCounter()
			cartPage.classList.add("hidden")
			// await showReceipt(orderId)
			showOrderStatus(orderId, minutes)
		}
	});
}




import { getCartItems, getCartCount, clearCart, updateQuantity, removeFromCart } from "../store.js"
import { submitOrder } from "../order.js"
import { showReceipt } from "./receipt.js"

const cartPage = document.getElementById("cart-page")
const cartContainer = document.getElementById("cart-items")
const cartTotalEl = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")

export function renderCart() {
    const items = getCartItems()
    cartContainer.innerHTML = ""

    if (!items.length) {
        cartContainer.innerHTML = "<p>Din varukorg är tom</p>"
        cartTotalEl.textContent = "0 SEK"
        return
    }

	let total = 0

	items.forEach(item => {
        const row = document.createElement("div")
        row.classList.add("cart-item")

        row.innerHTML = `
            <div class="cart-left">
                <h4>${item.name}</h4>
                <div class="cart-controls">
                    <button class="minus">−</button>
                    <span class="qty">${item.quantity}</span>
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

        // PLUS BUTTON
        row.querySelector(".plus").addEventListener("click", () => {
            updateQuantity(item.id, item.quantity + 1)
            renderCart()
            updateCartCounter()
        })

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

        cartContainer.appendChild(row)
        total += item.price * item.quantity
	})

	// items.forEach(item => {
	// 	const row = document.createElement("div")
	// 	row.classList.add("cart-item")

	// 	// Row 1: Item name
	// 	const cartLeft = document.createElement("div")
	// 	cartLeft.classList.add("cart-left")
	// 	const name = document.createElement("strong")
	// 	name.textContent = item.name
	// 	cartLeft.appendChild(name)

	// 	// Row 2: Controls + dots + price
	// 	const cartBottom = document.createElement("div")
	// 	cartBottom.classList.add("cart-bottom")

	// 	// Controls
	// 	const controls = document.createElement("div")
	// 	controls.classList.add("cart-controls")
	// 	const minusBtn = document.createElement("button")
	// 	minusBtn.classList.add("minus")
	// 	minusBtn.textContent = "−"
	// 	const qty = document.createElement("span")
	// 	qty.classList.add("qty")
	// 	qty.textContent = item.quantity
	// 	const plusBtn = document.createElement("button")
	// 	plusBtn.classList.add("plus")
	// 	plusBtn.textContent = "+"
	// 	controls.append(minusBtn, qty, plusBtn)

	// 	// Dots
	// 	const dots = document.createElement("span")
	// 	dots.classList.add("menu-dots")

	// 	// Price
	// 	const cartRight = document.createElement("div")
	// 	cartRight.classList.add("cart-right")
	// 	const priceEl = document.createElement("span")
	// 	priceEl.classList.add("price")
	// 	priceEl.textContent = `${item.price * item.quantity} SEK`
	// 	cartRight.appendChild(priceEl)

	// 	// Append controls, dots, price to bottom row
	// 	cartBottom.append(controls, dots, cartRight)

	// 	// Append rows to cart-item
	// 	row.append(cartLeft, cartBottom)

	// 	// Event listeners
	// 	plusBtn.addEventListener("click", () => {
	// 		updateQuantity(item.id, item.quantity + 1)
	// 		renderCart()
	// 		updateCartCounter()
	// 	})
	// 	minusBtn.addEventListener("click", () => {
	// 		if (item.quantity > 1) {
	// 			updateQuantity(item.id, item.quantity - 1)
	// 		} else {
	// 			removeFromCart(item.id)
	// 		}
	// 		renderCart()
	// 		updateCartCounter()
	// 	})

	// 	cartContainer.appendChild(row)
	// 	total += item.price * item.quantity
	// })



    cartTotalEl.textContent = `${total} SEK`
}

export function updateCartCounter() {
    const badge = document.querySelector(".cart-count")
    badge.textContent = getCartCount()
}

export function setupCart() {
    renderCart()
    updateCartCounter()

    checkoutBtn.addEventListener("click", async () => {
		const orderId = await submitOrder()
		if (!orderId) {
			console.error("Order failed or no orderId returned")
			return
		}
        clearCart()
        renderCart()
        updateCartCounter()
        cartPage.classList.add("hidden")
        await showReceipt(orderId)
    });
}



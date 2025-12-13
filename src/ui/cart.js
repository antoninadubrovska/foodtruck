
import { getCartItems, getCartCount, clearCart, updateQuantity, removeFromCart } from "../store.js"
import { submitOrder } from "../order.js"
// For console testing, temporarily expose submitOrder globally
// window.submitOrder = submitOrder
//import { showReceipt } from "./receipt.js"

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
		console.log('Order Id: ', orderId)
		if (!orderId) {
			console.error("Order failed or no orderId returned")
			return
		}
        clearCart()
        renderCart()
        updateCartCounter()
        cartPage.classList.add("hidden")
    //    await showReceipt(orderId)
    });
}




import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"


const receiptPage = document.getElementById("receipt-page")
const receiptItems = document.getElementById("receipt-items")
const receiptTotalEl = document.getElementById("receipt-total")
const receiptOrderId = document.getElementById("receipt-order-id")
const receiptTimestamp = document.getElementById("receipt-eta")
const newOrderBtn = document.getElementById("new-order-btn")
//const menuPage = document.getElementById("menu-page")

const orderStatusPage = document.getElementById("order-status-page")

export async function showReceipt(orderId) {

	// fetches final receipt
    const receipt = await getReceipt(orderId)

    if (!receipt || !receipt.items) {
        console.error("Invalid receipt response:", receipt)
		return

    }

	// render
    receiptItems.innerHTML = ""
    receiptOrderId.textContent = `#` + receipt.id
    // receiptTimestamp.textContent =` ETA: ` +
    //     new Date(receipt.timestamp).toLocaleTimeString("sv-SE")

    receipt.items.forEach(item => {
        const row = document.createElement("div")
        row.classList.add("cart-item")

        row.innerHTML = `
            <div class="cart-left">
                <h4>${item.name}</h4>
                <span class="qty">${item.quantity} st</span>
            </div>
			<span class="menu-dots"></span>

            <div class="cart-right">
                <span class="price">${item.price * item.quantity} SEK</span>
            </div>
        `

        receiptItems.appendChild(row)
    })

	// backend-calculated total
	receiptTotalEl.textContent = `TOTALT: ${receipt.orderValue} SEK`
	orderStatusPage.classList.add('hidden')
    receiptPage.classList.remove("hidden")
}

// Full loop complete
newOrderBtn.addEventListener("click", () => {
    receiptPage.classList.add("hidden")
    showMenuPage()
})
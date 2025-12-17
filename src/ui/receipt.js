
import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"


const receiptPage = document.getElementById("receipt-page")
const receiptItems = document.getElementById("receipt-items")
const receiptTotalEl = document.getElementById("receipt-total")
const receiptOrderId = document.getElementById("receipt-order-id")
//const receiptTimestamp = document.getElementById("receipt-eta")
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
                <span class="qty">${item.quantity} stycken</span>
            </div>
			<span class="menu-dots"></span>

            <div class="cart-right">
                <span class="price">${item.price * item.quantity} SEK</span>
            </div>
        `

        receiptItems.appendChild(row)
    })

	// backend-calculated total, structured markup instead of textContent:
	// receiptTotalEl.textContent = `TOTALT ${receipt.orderValue} SEK`

	receiptTotalEl.innerHTML =
	`<div class="receipt-total-inner">
	<span class="label"> TOTALT</span>
	<span class="placeholder"></span>
	<span class="amount">${receipt.orderValue} SEK</span>
	</div>`

	// 	receiptTotalEl.innerHTML = `

//   <div class="cart-left">
//     <h4>TOTALT</h4>
//   </div>
//   <span class="menu-dots"></span>
//   <div class="cart-right">
//     <span class="price">${receipt.orderValue} SEK</span>
//   </div>
// `


	orderStatusPage.classList.add('hidden')
    receiptPage.classList.remove("hidden")
}

// Full loop complete
newOrderBtn.addEventListener("click", () => {
    receiptPage.classList.add("hidden")
    showMenuPage()
})
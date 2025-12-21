import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"
import { showReceipt } from "./receipt.js"

const page = document.getElementById("order-status-page")
const orderIdEl = document.getElementById("status-order-id")
const etaEl = document.getElementById("status-eta")
const seeReceiptBtn = document.getElementById("see-receipt-btn")
const newOrderBtn = document.getElementById("new-order-btn-status")

// This is temporary SPA state as Button click happens later & ORDER ID IS still needed:
let currentOrderId = null


export async function showOrderStatus(orderId, minutes) {
	currentOrderId = orderId

	//reuse receipt data
	const receipt = await getReceipt(orderId)

	// Show ETA or "ready" message if 0 minutes
	etaEl.textContent = minutes <= 0
	? "BESTÄLLNINGEN ÄR KLAR"
	: "ETA " + minutes + " MIN"

	orderIdEl.textContent = '#' + receipt.id

	page.classList.remove("hidden")
}


seeReceiptBtn.addEventListener("click", () => {
	page.classList.add("hidden")
	showReceipt(currentOrderId)
})

newOrderBtn.addEventListener("click", () => {
	page.classList.add("hidden")
	showMenuPage()
})


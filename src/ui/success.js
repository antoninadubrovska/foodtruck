import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"
import { showReceipt } from "./receipt.js"
import { calculateEtaMinutes } from "../order.js"

const page = document.getElementById("order-status-page")
const orderIdEl = document.getElementById("status-order-id")
const etaEl = document.getElementById("status-eta")
const seeReceiptBtn = document.getElementById("see-receipt-btn")
const newOrderBtn = document.getElementById("new-order-btn-status")

// This is temporary SPA state as Button click happens later & ORDER ID IS still needed:
let currentOrderId = null
let etaInterval = null

export async function showOrderStatus(orderId) {
currentOrderId = orderId

  //reuse receipt data
const receipt = await getReceipt(orderId)

	// Renders order number and estimated time
	orderIdEl.textContent = '#' + receipt.id


	function updateEta() {
        const minutesLeft = calculateEtaMinutes(receipt.eta)
        etaEl.textContent = minutesLeft > 0 ? `ETA ${minutesLeft} MIN` : "Klar!"
    }

    updateEta()

    // Update every 30 seconds
    if (etaInterval) clearInterval(etaInterval)
    etaInterval = setInterval(updateEta, 30_000)


	console.log("ORDER TIME (UTC):", receipt.timestamp)
	console.log("CURRENT TIME (LOCAL):", new Date().toISOString())
	console.log("Minutes left:", calculateEtaMinutes(receipt.timestamp))


//   hideAllPages()
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

// function hideAllPages() {
//   document.querySelectorAll("section").forEach(s =>
//     s.classList.add("hidden")
//   )
//}
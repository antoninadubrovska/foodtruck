import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"
import { showReceipt } from "./receipt.js"

const page = document.getElementById("order-status-page")
const orderIdEl = document.getElementById("status-order-id")
const etaEl = document.getElementById("status-eta")
const seeReceiptBtn = document.getElementById("see-receipt-btn")
const newOrderBtn = document.getElementById("new-order-btn-status")

let currentOrderId = null

export async function showOrderStatus(orderId) {
  currentOrderId = orderId

  const receipt = await getReceipt(orderId)

  orderIdEl.textContent = receipt.id
  etaEl.textContent =
    new Date(receipt.timestamp).toLocaleTimeString("sv-SE")

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
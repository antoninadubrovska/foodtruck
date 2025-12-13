
import { getReceipt } from "../api.js"
import { showMenuPage } from "./menu.js"


const receiptPage = document.getElementById("receipt-page")
const receiptItems = document.getElementById("receipt-items")
const receiptTotalEl = document.getElementById("receipt-total")
const receiptOrderId = document.getElementById("receipt-order-id")
const receiptTimestamp = document.getElementById("receipt-eta")
const newOrderBtn = document.getElementById("new-order-btn")
//const menuPage = document.getElementById("menu-page")

export async function showReceipt(orderId) {
    const receipt = await getReceipt(orderId)

    if (!receipt || !receipt.items) {
        console.error("Invalid receipt response:", receipt)
        return
    }

    receiptItems.innerHTML = ""
    receiptOrderId.textContent = receipt.id
    receiptTimestamp.textContent =
        new Date(receipt.timestamp).toLocaleTimeString("sv-SE")

    receipt.items.forEach(item => {
        const row = document.createElement("div")
        row.classList.add("cart-item")

        row.innerHTML = `
            <div class="cart-left">
                <h4>${item.name}</h4>
                <span class="qty">${item.quantity} st</span>
            </div>

            <div class="cart-right">
                <span class="price">${item.price * item.quantity} SEK</span>
            </div>
        `

        const dots = document.createElement("span")
        dots.classList.add("menu-dots")
        row.insertBefore(dots, row.querySelector(".cart-right"))

        receiptItems.appendChild(row)
    })

    receiptTotalEl.textContent = `${receipt.orderValue} SEK`
    receiptPage.classList.remove("hidden")
}

newOrderBtn.addEventListener("click", () => {
    receiptPage.classList.add("hidden")
    showMenuPage()
})
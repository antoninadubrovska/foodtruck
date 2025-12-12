

//import { initTenant } from './store.js'
import { setupMenu } from './ui/menu.js'
import { setupCart, renderCart } from './ui/cart.js'

const menuContainer = document.querySelector(".menu-container")
const cartPage = document.getElementById("cart-page")
const receiptSection = document.getElementById("receipt")
const cartIcon = document.querySelector(".cart-icon")

function showMenuPage() {
    menuContainer.classList.remove("hidden")
    cartPage.classList.add("hidden")
    receiptSection.classList.add("hidden")
}

function showCartPage() {
    menuContainer.classList.add("hidden")
    cartPage.classList.remove("hidden")
    receiptSection.classList.add("hidden")
    renderCart()
}

cartIcon.addEventListener("click", showCartPage)

// back button in cart
const backBtn = document.createElement("button")
backBtn.classList.add('checkout-or-goback-group')
backBtn.textContent = "Tillbaka till menyn"
backBtn.addEventListener("click", showMenuPage)
cartPage.appendChild(backBtn)

// SPA
async function initApp() {
    //await initTenant()
    await setupMenu()
    setupCart()
}

initApp()

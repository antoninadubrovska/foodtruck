
import { createTenant } from "./api.js"

// Keep tenant ID in localStorage
export async function initTenant(studentName = "Nina") {
    let tenantId = localStorage.getItem("tenantId")

    if (!tenantId) {
        const tenant = await createTenant(studentName)
        tenantId = tenant.id
        localStorage.setItem("tenantId", tenantId)
        console.log("Created new tenant:", tenantId)
    } else {
        console.log("Using existing tenant:", tenantId)
    }

    return tenantId
}

// In-memory cart only
let cart = []

export function addToCart(item) {
    const existing = cart.find(i => i.id === item.id)
    if (existing) {
        existing.quantity++
    } else {
        cart.push({ ...item, quantity: 1 })
    }
}

export function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId)
}

export function updateQuantity(itemId, qty) {
    const item = cart.find(i => i.id === itemId)
    if (item) item.quantity = qty
}

export function getCartItems() {
    return cart
}

export function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function clearCart() {
    cart = []
}

// export function removeButtonFromCart(itemId) {
//     cart = cart.filter(i => i.id !== itemId)
// }



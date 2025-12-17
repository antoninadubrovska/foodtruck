

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



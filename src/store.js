


// Keep tenant ID in localStorage
// export async function initTenant( tenantName = "Antonina") {
//     let tenantId = localStorage.getItem("tenantId")

//     if (!tenantId) {
//         const tenant = await createTenant(tenantName)
//         tenantId = tenant.id
//         localStorage.setItem("tenantId", tenantId)
//         console.log("Created new tenant:", tenantId)
//     } else {
//         console.log("Using existing tenant:", tenantId)
//     }

//     return tenantId
// }

// let tenantId = null

// export async function initTenant(tenantName = "Ninalina") {
//     //let tenantId = localStorage.getItem("tenantId")

//     if (!tenantId) {
//         try {
//             const tenant = await createTenant(tenantName)
//             tenantId = tenant.id
//             //localStorage.setItem("tenantId", tenantId)
//             console.log("Created new tenant:", tenantId)
//         } catch (error) {
//             if (error.message.includes("already exists")) {
//                 console.warn("Tenant already exists. Use existing tenantId manually.")
//                 // If you know the ID of the existing tenant, assign it here:
//                 // Hardcode or prompt user for the ID
//                 tenantId = "YOUR_EXISTING_TENANT_ID"
//                 //
//             } else {
//                 throw error
//             }
//         }
//     }

//     return tenantId
// }

// // Getter to use tenantId elsewhere
// export function getTenantId() {
//     if (!tenantId) {
//         throw new Error("Tenant ID not initialized. Call initTenant() first.")
//     }
//     return tenantId
// }

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



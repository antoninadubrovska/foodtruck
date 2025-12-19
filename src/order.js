
import { getTenantId } from "./tenant.js"
import { createOrder } from "./api.js"
import { getCartItems } from "./store.js"


async function submitOrder() {
	
	const tenantId = getTenantId()

    const cartItems = getCartItems()

	const ids = cartItems.flatMap(item => Array(item.quantity).fill(item.id))

    const orderBody = { items: ids }

	const response = await createOrder(tenantId, orderBody)
    return response && response.order.id ? response.order.id : null
}

/**
 * Calculate minutes left until order is ready based on server-provided ETA
 * @param {string} etaIsoString - ETA string from API (ISO8601, UTC)
 */

function calculateEtaMinutes(etaIsoString) {
    if (!etaIsoString) return 0
    const readyTime = new Date(etaIsoString); // server ETA (UTC)
    const now = new Date() // local time
    const diffMinutes = Math.ceil((readyTime - now) / 60000)
    return Math.max(diffMinutes, 0)
}



export { submitOrder, calculateEtaMinutes }
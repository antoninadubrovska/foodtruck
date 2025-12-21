
import { getTenantId } from "./tenant.js"
import { createOrder } from "./api.js"
import { getCartItems } from "./store.js"

async function submitOrder() {
	const tenantId = getTenantId()
	const cartItems = getCartItems()

	const ids = cartItems.flatMap(item =>
		Array(item.quantity).fill(item.id)
	)

	const orderBody = { items: ids }

	const response = await createOrder(tenantId, orderBody)

	if (!response || !response.order?.id) {
		return null
	}

	return {
		orderId: response.order.id,
		etaTime: response.order.eta,
		curTime: response.order.timestamp
	}
}




export { submitOrder }
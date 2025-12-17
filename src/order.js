
import { getTenantId } from "./tenant.js"
import { createOrder } from "./api.js"
import { getCartItems } from "./store.js"


//const tenantId = 'mq65'

async function submitOrder() {
	//const tenantId = localStorage.getItem("tenantId")
	const tenantId = getTenantId()

    const cartItems = getCartItems()

	const ids = cartItems.flatMap(item => Array(item.quantity).fill(item.id))

    const orderBody = { items: ids }

	const response = await createOrder(tenantId, orderBody)
    return response && response.order.id ? response.order.id : null
}

export { submitOrder }
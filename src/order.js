

// import { getTenantId } from "./store.js"
import { createOrder } from "./api.js"
import { getCartItems } from "./store.js"


const tenantId = 'mq65'

async function submitOrder() {
	//const tenantId = localStorage.getItem("tenantId")

    const cartItems = getCartItems()

    // const orderBody = {
    //     items: cartItems.map(i => ({ id: i.id, quantity: i.quantity }))
	// }

	const ids = cartItems.flatMap(item => Array(item.quantity).fill(item.id))

    const orderBody = { items: ids }

	const response = await createOrder(tenantId, orderBody)

	// return response.id // return order id

	// createOrder returns the whole order object; return the id
    return response && response.order.id ? response.order.id : null
}

export { submitOrder }
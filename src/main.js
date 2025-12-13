

//import { createTenant } from "./api.js"
import { setupMenu } from './ui/menu.js'
import { setupCart } from './ui/cart.js'


// SPA
async function initApp() {
	//const tenantId = await initTenant("Ninalina")
	// console.log("Tenant ready:", tenantId)
	// await initTenant("Ninalina")
    await setupMenu()
    setupCart()
}

initApp()



import { initTenant } from './tenant.js'
import { setupMenu } from './ui/menu.js'
import { setupCart } from './ui/cart.js'


// SPA
async function initApp() {
	await initTenant()
	await setupMenu()
	setupCart()

	const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

initApp()

import { createTenant } from "./api.js"

const TENANT_KEY = "tenantId"

export async function initTenant(name = "Yaliuka") {
	localStorage.setItem(TENANT_KEY, 'YOUR_EXISTING_TENANT_ID');

	let tenantId = localStorage.getItem(TENANT_KEY)

	if (!tenantId) {

		try {
			const tenant = await createTenant(name)
			tenantId = tenant.id
			localStorage.setItem(TENANT_KEY, tenantId)
		} catch (err) {
			console.error("Failed to initialize tenant", err)
			throw err
		}

	}

	return tenantId
}

export function getTenantId() {
	const tenantId = localStorage.getItem(TENANT_KEY)
	if (!tenantId) {
		throw new Error("Tenant not initialized")
	}
	return tenantId
}
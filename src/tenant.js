import { createTenant } from "./api.js"

const TENANT_KEY = "tenantId"

export async function initTenant(name = "Yaliuka") {
    let tenantId = localStorage.getItem(TENANT_KEY)

    if (!tenantId) {
        const tenant = await createTenant(name)
        tenantId = tenant.id
        localStorage.setItem(TENANT_KEY, tenantId)
        console.log("Created tenant:", tenantId)
    }

	return tenantId
}

export function getTenantId() {
	const tenantId = localStorage.getItem(TENANT_KEY)
	//console.log("Tenant ready:", tenantId)
    if (!tenantId) {
        throw new Error("Tenant not initialized")
    }
    return tenantId
}
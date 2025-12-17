

const baseUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

const apiKey = 'yum-JAaNDtW2DyvIHS96'

export async function getMenu() {
    try {
        const res = await fetch(baseUrl + 'menu', {
			headers: {
				'accept': 'application/json',
				'x-zocom': apiKey
			}
        })
        return await res.json()
    } catch (error) {
        console.error("Error fetching menu:", error)
    }
}


export async function createTenant(name) {
    const res = await fetch(baseUrl + 'tenants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-zocom': apiKey
        },
        body: JSON.stringify({ name })
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Tenant creation failed: ${res.status} ${errorText}`)
    }

    return await res.json()
}


export async function createOrder(tenantId, orderBody) {
    try {
        const res = await fetch(`${baseUrl}${tenantId}/orders`, {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-zocom': apiKey
			},
            body: JSON.stringify(orderBody)
		})

		// if (!res.ok) line turns fetch into a reliable API client.
		if (!res.ok) {
			throw new Error(`Order failed: ${res.status}`)
		}

        return await res.json()
    } catch (error) {
        console.error("Error creating order:", error)
    }
}

// By unwrapping data.receipt removed the extra layer that was causing receipt.items to be undefined.

export async function getReceipt(orderId) {
    try {
        const res = await fetch(`${baseUrl}receipts/${orderId}`, {
			headers: {
				'accept': 'application/json',
				'x-zocom': apiKey
			}
		})

		//return await res.json()
		const data = await res.json()
        return data.receipt   // unwrap

    } catch (error) {
        console.error("Error fetching receipt:", error)
    }
}

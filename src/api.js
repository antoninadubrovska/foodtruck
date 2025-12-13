
// // menu
// // curl -X 'GET' \
// //   'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu' \
// //   -H 'accept: application/json' \
// //   -H 'x-zocom: yum-JAaNDtW2DyvIHS96'

// // "items": [
// //     {
// //       "id": 1,
// //       "type": "wonton",
// //       "name": "Karlstad",
// //       "description": "En god friterad wonton med smaker från de värmländska skogarna.",
// //       "ingredients": [
// //         "kantarell",
// //         "scharlottenlök",
// //         "morot",
// //         "bladpersilja"
// //       ],
// //       "price": 9
// //     },

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



//TODO
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

// // tenant
// // curl -X 'POST' \
// //   'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants' \
// //   -H 'accept: application/json' \
// //   -H 'x-zocom: yum-7BTxHCyHhzI' \
// //   -H 'Content-Type: application/json' \
// //   -d '{
// //   "name": "Vitaly"
// // }'

// name = 'Vitaly', tenantID = 'mq65'


export async function createOrder(tenantId, orderBody) {
    try {
        const res = await fetch(`${baseUrl}/${tenantId}/orders`, {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-zocom': apiKey
			},
            body: JSON.stringify(orderBody)
		})
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

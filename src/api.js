

// const baseUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'


// const apiKey = 'yum-JAaNDtW2DyvIHS96'

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

// async function getMenu() {

// 	try {
// 		const response = await fetch(baseUrl + 'menu', {
// 			method: 'GET',
// 			headers: {
// 				'accept': 'application/json',
// 				'x-zocom': apiKey
// 			}
// 		})
// 		const data = await response.json()
// 		console.log('Menu: ', data)
// 	return data


// 	} catch (error) {
// 		console.error('Error fetching menu: ', error)
// 	}

// 	}

// // tenant
// // curl -X 'POST' \
// //   'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants' \
// //   -H 'accept: application/json' \
// //   -H 'x-zocom: yum-7BTxHCyHhzI' \
// //   -H 'Content-Type: application/json' \
// //   -d '{
// //   "name": "zocom"
// // }'

// // {
// // 	"name": "zocom",
// // 	"id": "a2f4"
// //   }

// async function createTenant(tenantName) {
// 	try {
// 		const response = await fetch(baseUrl + 'tenants', {
// 			method: 'POST',
// 			headers: {
// 				// 'accept': 'application/json',
// 				'x-zocom': apiKey,
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ name: tenantName })

// 		})
// 		const data = await response.json()
// 		console.log('Tenant created: ', data)
// 		return data
// 	} catch (error) {
// 		console.error('Error creating tenant: ', error)
// 	}
// }


// // later use
// // const tenantId = localStorage.getItem("tenantId")

// async function createOrder(tenantId, orderBody) {
//     try {
//         const res = await fetch(`${baseUrl}tenants/${tenantId}/orders`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-zocom': apiKey
//             },
//             body: JSON.stringify(orderBody)
//         })

//         return await res.json()
//     } catch (err) {
//         console.error("Error creating order:", err)
//     }
// }


// async function getReceipt(orderId) {
//     try {
//         const res = await fetch(`${baseUrl}receipts/${orderId}`, {
//             method: 'GET',
//             headers: {
//                 'accept': 'application/json',
//                 'x-zocom': apiKey
//             }
//         })
//         return await res.json()
//     } catch (err) {
//         console.error("Error fetching receipt:", err)
//     }
// }

// export { getMenu, createTenant, createOrder, getReceipt }

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
    try {
        const res = await fetch(baseUrl + 'tenants', {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json', 'x-zocom': apiKey
			},
			body: JSON.stringify({ name })
		})
		console.log('success', name)
		return await res.json()
    } catch (error) {
        console.error("Error creating tenant:", error)
    }
}

export async function createOrder(tenantId, orderBody) {
    try {
        const res = await fetch(`${baseUrl}tenants/${tenantId}/orders`, {
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

export async function getReceipt(orderId) {
    try {
        const res = await fetch(`${baseUrl}receipts/${orderId}`, {
            headers: { 'accept': 'application/json', 'x-zocom': apiKey }
        })
        return await res.json()
    } catch (error) {
        console.error("Error fetching receipt:", error)
    }
}

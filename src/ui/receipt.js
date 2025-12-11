// // // Receives order data and displays the receipt
// // export function showReceipt(order) {
// //     const receiptSection = document.getElementById("receipt");
// //     receiptSection.classList.remove("hidden");

// //     // Display order ID
// //     document.getElementById("receipt-order-id").textContent =
// //         "Ordernummer: " + order.id;

// //     // OPTIONAL: display ordered items
// //     if (order.items) {
// //         let itemsList = document.getElementById("receipt-items");
// //         if (!itemsList) {
// //             itemsList = document.createElement("ul");
// //             itemsList.id = "receipt-items";
// //             receiptSection.appendChild(itemsList);
// //         }
// //         itemsList.innerHTML = "";
// //         order.items.forEach(item => {
// //             const li = document.createElement("li");
// //             li.textContent = `${item.name} – ${item.price} SEK`;
// //             itemsList.appendChild(li);
// //         });
// //     }
// // }


// import { getReceipt } from "../api.js"

// export async function showReceipt(orderId) {
//     const receiptSection = document.getElementById("receipt")
//     receiptSection.classList.remove("hidden")

//     const receipt = await getReceipt(orderId)

//     // Display order ID
//     document.getElementById("receipt-order-id").textContent = "Ordernummer: " + receipt.id

//     // Display items
//     const itemsList = document.getElementById("receipt-items")
//     itemsList.innerHTML = ""

//     receipt.items.forEach(item => {
//         const li = document.createElement("li")
//         li.textContent = `${item.name} – ${item.price} SEK × ${item.quantity}`
//         itemsList.appendChild(li)
//     })
// }

import { getReceipt } from "../api.js";

export async function showReceipt(orderId) {
    const receiptSection = document.getElementById("receipt");
    receiptSection.classList.remove("hidden");

	const receipt = await getReceipt(orderId);
	if (!receipt) {
		receiptSection.innerHTML = "<p>Kunde inte hämta kvitto.</p>"
		return
	}

    document.getElementById("receipt-order-id").textContent = "Ordernummer: " + receipt.id;

    const itemsList = document.getElementById("receipt-items");
    itemsList.innerHTML = "";
    receipt.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} – ${item.price} SEK × ${item.quantity}`;
        itemsList.appendChild(li);
	});

	// // (optionally) show totals, timestamp, eta
	// const totalEl = document.createElement("p")
	// totalEl.textContent = `Total: ${receipt.orderValue} SEK`
	// receiptSection.appendChild(totalEl)

	// if (receipt.eta) {
	//   const etaEl = document.createElement("p")
	//   etaEl.textContent = `Beräknad leverans: ${new Date(receipt.eta).toLocaleString()}`
	//   receiptSection.appendChild(etaEl)
	// }

}

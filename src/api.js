// Alla funktioner som gör fetch

const baseUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'
// const baseUrl = 'https://corsproxy.io/?url=https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'



// To use the API you must first fetch your own API key.POST to / keys.Save the key in a variable in your code once retrieved.

const apiKey = 'yum-JAaNDtW2DyvIHS96'

// menu

// curl -X 'GET' \
//   'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu' \
//   -H 'accept: application/json' \
//   -H 'x-zocom: yum-JAaNDtW2DyvIHS96'



// "items": [
//     {
//       "id": 1,
//       "type": "wonton",
//       "name": "Karlstad",
//       "description": "En god friterad wonton med smaker från de värmländska skogarna.",
//       "ingredients": [
//         "kantarell",
//         "scharlottenlök",
//         "morot",
//         "bladpersilja"
//       ],
//       "price": 9
//     },

async function getMenu() {

	try {
		const response = await fetch(baseUrl + 'menu', {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'x-zocom': apiKey
			}
		})
		const data = await response.json()
		console.log('Menu: ', data)
	return data


	} catch (error) {
		console.error('Error fetching menu: ', error)
	}

	}

export { getMenu}
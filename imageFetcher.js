export default async function fetchImages(imageCount) {

	let images = []
	const theme = document.getElementById("theme").value;

	for(let i = 0; i < imageCount; i++) {
		let imageURL = ''
		
		if(theme === "memes"){
		imageURL = await fetchMemesFromJson()
		} else if(theme === "cats"){
			imageURL = await fetchCatFromJson()
		}else if(theme === "perry"){
			const url = "https://picsum.photos/200"
			const response = await fetch(url)
			const blob = await response.blob()
			imageURL = URL.createObjectURL(blob)
		}
		images.push({ url: imageURL, pairId: `pair-${i}` })
		
 	}
	return images;

 	async function fetchMemesFromJson(){
		return fetch('https://api.imgflip.com/get_memes')
		.then(res => res.json())
		.then(data => {
			const index = Math.floor(Math.random() * (Math.min(data.data.memes.length - 1) + 1)) 
			return data.data.memes[index].url
			})

		.catch(error => console.error());
	};

	async function fetchCatFromJson(){
		return fetch('https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_XFCaEEcJQ64hkmAqbr8x1yFudMIvB5QBWXGQX1BBEFUg6igiTiCj88N7msIS4agN%27')
		.then(res => res.json())
		.then(data => {
			const index = Math.floor(Math.random() * (Math.min(data.length - 1) + 1)) 
			return data[index].url
			})
		.catch(error => console.error());
	};
}

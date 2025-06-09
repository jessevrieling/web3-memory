export default async function fetchImages(imageCount) {

	let images = []
	const theme = document.getElementById("theme").value;

	for(let i = 0; i < imageCount; i++) {
		let imageURL = ''
		
		if(theme === "memes"){
		imageURL = await fetchMemesFromJson()
		} else if(theme === "cats"){
			imageURL = await fetchCatFromJson()
			// console.log(imageURL)
		}else if(theme === "dogs"){
			imageURL = await fetchDogFromJson()
		}
		else if(theme === "random"){
			const url = "https://picsum.photos/200"
			const response = await fetch(url)
			const blob = await response.blob()
			imageURL = URL.createObjectURL(blob)
		}
		images.push({ url: imageURL, pairId: `pair-${i}` })
		
 	}
	console.log(images)
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
		return fetch('https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=live_XFCaEEcJQ64hkmAqbr8x1yFudMIvB5QBWXGQX1BBEFUg6igiTiCj88N7msIS4agN%27')
		.then(res => res.json())
		.then(data => {
			const index = Math.floor(Math.random() * (Math.min(data.length - 1) + 1)) 
			return data[index].url
			})
		.catch(error => console.error());
	};
	async function fetchDogFromJson(){
		return fetch('https://api.thedogapi.com/v1/images/search?limit=50&api_key=live_zIIE3Ive8mZMVr57U28EhJqkPUMRGnOxqPDWfN2fg7DX3HQ35QQusz8G4bfGi5sx')
		.then(res => res.json())
		.then(data => {
			const index = Math.floor(Math.random() * (Math.min(data.length - 1) + 1)) 
			console.log(data[index].url)
			return data[index].url
			})
		.catch(error => console.error());
	};
}

export default async function fetchImages(imageCount) {
	
	let images = []
	const theme = document.getElementById("theme").value;

	for(let i = 0; i < imageCount; i++) {
		let imageURL = ''
		
		if(theme === "memes"){
		imageURL = await fetchMemesFromJson()
		} else if(theme === "spongebob"){
			const url = "https://picsum.photos/200"
			const response = await fetch(url)
			const blob = await response.blob()
			imageURL = URL.createObjectURL(blob)
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
}

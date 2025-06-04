export default async function fetchImages(imageCount) {
	let images = []
	// const url = "https://picsum.photos/200"
	// const url= fetchFromJson();
	
	for(let i = 0; i < imageCount; i++) {
		
		// const response = await fetch(url)
		// const blob = await response.blob()
		// const objectUrl = URL.createObjectURL(blob)

		// images.push({ url: objectUrl, pairId: `pair-${i}` });
		// if(){
		const response = await fetchMemesFromJson(i)
		images.push({ url: response, pairId: `pair-${i}` });
		// }
		
 	}
	return images;

 	async function fetchMemesFromJson(index){
		return fetch('https://api.imgflip.com/get_memes')
		.then(res => res.json())
		.then(data => {
			return data.data.memes[index].url
			})

		.catch(error => console.error());
	};
}

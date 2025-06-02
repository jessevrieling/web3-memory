export default async function fetchImages(imageCount) {
	let images = []
	const url = "https://picsum.photos/200"
	
	for(let i = 0; i < imageCount; i++) {
		const response = await fetch(url)
		const blob = await response.blob()
		const objectUrl = URL.createObjectURL(blob)

		images.push({ url: objectUrl, pairId: `pair-${i}` });
	}

	return images;
}

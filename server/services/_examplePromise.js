// write a function to retrieve a blob of json
// make an ajax request! use the 'fetch' function
// http://rallycoding.herokuapp.com/api/music_albums

/*function fetchAlbums() {
	// fetch returns a response in the form of a promise
	fetch('http://rallycoding.herokuapp.com/api/music_albums')
		.then(res => res.json())
		.then(json => console.log(json));
}*/

// async tells our javascript code that we're about to do something asynchronous

const fetchAlbums = async () => {
	const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json();
	console.log(json);
}

fetchAlbums();
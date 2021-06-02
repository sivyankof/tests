(function () {
    const API_KEY = '88bb319131881a47bed8630b8e3c0e5e';
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    
    const POPULAR_URL = `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`

    window.DataService = {
        getMovies: getMovies,
        getPicturePath: getPicturePath
    }

    function getPicturePath(poster_path) {
        return API_IMG_PATH + poster_path;
    }

    async function getMovies() { 
        const result = await fetch(API_URL + POPULAR_URL);
        
        const data = await result.json()
        console.log(data)
        return data.results
    }



    // function getMovies() { 
    //     return fetch(API_URL + POPULAR_URL)
    //         .then(result => result.json())
    //         .then(data => data.results)
        
    // }

})();
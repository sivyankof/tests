(function () {
    const API_KEY = '88bb319131881a47bed8630b8e3c0e5e';
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

    const POPULAR_URL = `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

    window.DataService = {
        getMovies: getMovies,
        getPicturePath: getPicturePath,
    };

    function getPicturePath(poster_path) {
        return API_IMG_PATH + poster_path;
    }

    async function getMovies() {
        const result = await fetch(API_URL + POPULAR_URL);

        const data = await result.json();
        // console.log(data);
        return data.results;
    }
})();

(async function start() {
    const $movieList = document.getElementById('main');
    const $movieTemplate = document.getElementById('movieTemplate');

    const movies = await DataService.getMovies();
    let moviesHTML = '';
    let nameRating = '';
    // console.log(movies);

    movies.forEach(drawMovieCard);

    $movieList.innerHTML = moviesHTML;

    function drawMovieCard(movie) {
        movie.imageSrc = DataService.getPicturePath(movie.poster_path);

        let template = $movieTemplate.innerHTML;

        const matches = template.match(/\{\{.+?\}\}/g);
        const average = template.match('movie-info--raiting--top');

        let rating = movie.vote_average;

        if (rating <= 10 && rating >= 7) {
            nameRating = 'movie-info--raiting--top';
        } else if (rating <= 7 && rating >= 4) {
            nameRating = 'movie-info--raiting--middle';
        } else if (rating <= 4 && rating >= 0) {
            nameRating = 'movie-info--raiting--down';
        }

        matches.forEach((match) => {
            const name = match.replace('{{', '').replace('}}', '');

            template = template.replace(match, movie[name]);
            template = template.replace(average, nameRating);
        });

        moviesHTML += template;
    }
})();

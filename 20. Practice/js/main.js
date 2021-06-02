(async function start() {
    const $movieList = document.getElementById('main');
    const $movieTemplate = document.getElementById('movieTemplate');
    const movies = await DataService.getMovies();
    let moviesHTML = '';
    console.log(movies);

    movies.forEach(drawMovieCard);

    $movieList.innerHTML = moviesHTML;

    function drawMovieCard(movie) {
        movie.imageSrc = DataService.getPicturePath(movie.poster_path);

        let template = $movieTemplate.innerHTML;

        const matches = template.match(/\{\{.+?\}\}/g);
        const average = template.match('movie-info--raiting--top');

        let rating = movie.vote_average;

        let nameRating = '';

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

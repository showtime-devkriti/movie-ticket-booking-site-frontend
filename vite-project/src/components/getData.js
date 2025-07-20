const api = "82a1a139ceda67baea100faaf5248ddc"

const getSearchResults = async function fetchData(query, language) {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${encodeURIComponent(query)}&include_adult=false`, {
        method: 'GET',
    });

    if (!tmdbResponse.ok) {
        throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data = await tmdbResponse.json();
    const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterurl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        o_language: movie.original_language,
    }));
    //console.log(movies)
    return movies;
}

export default getSearchResults;
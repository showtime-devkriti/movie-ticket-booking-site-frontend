import Cookies from 'js-cookie';

const api = "3c3c1d1f41aba7ea370b09194c130360"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzNjMWQxZjQxYWJhN2VhMzcwYjA5MTk0YzEzMDM2MCIsIm5iZiI6MTc1MzAwODEwOS4zMDMsInN1YiI6IjY4N2NjN2VkZGZmMDA4MWRhYzcyYzcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OZc2ftgzkSiEcFi9nL7WnYsXFGjG3NC9XR4q0HlGk0g"

const languageMap = {
    "Telugu": "te",
    "Hindi": "hi",
    "English": "en",
    "Tamil": "ta",
    "Malayalam": "ml",
    "Kannada": "kn",
    "Marathi": "mr",
    "Bengali": "bn",
    "Punjabi": "pa",
    "Gujarati": "gu",
    "Odia": "or",
    "Urdu": "ur",
};

const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "SciFi",
    10770: "TVMovie",
    53: "Thriller",
    10752: "War",
    37: "Western",
};

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};


//https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1

const getSearchResults = async function getSearchResults(query, language) {
    const lang_code = languageMap[language] || "en";

    const fetchPage = async () => {
        console.log(lang_code)
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?&query=${query}&include_adult=false&with_original_language=${lang_code}`, options);
        if (!res.ok) return [];
        const data = await res.json();
        // return data.results
        //     .map(movie => ({
        //         id: movie.id,
        //         title: movie.title,
        //         posterurl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
        //         o_language: movie.original_language,
        //     }));
        return data
    };

    // for (let i = 1; i <= pageLimit; i += batchSize) {
    //     const batch = Array.from({ length: batchSize }, (_, idx) => i + idx).filter(p => p <= pageLimit);
    //     const results = await Promise.all(batch.map(page => fetchPage(page)));
    //     results.forEach(movies => allMovies.push(...movies));
    //     console.log(`Fetched pages ${batch[0]} to ${batch[batch.length - 1]}`);

    //     // wait 10 seconds to avoid hitting rate limit
    //     await delay(10000);
    // }
    //fetchPage(1)

    console.log( await fetchPage());
    //return movies;
}

const getMovieById = async (tmdbId) => {
    try {
        const ids = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/external_ids`, options)
            .then(res => res.json())


        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}`, options);

        if (!movieRes.ok) {
            throw new Error(`TMDB API responded with status `);
        }

        const movieDetails = await movieRes.json()

        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, options).then(res => res.json());

        const crew = creditsRes.crew || [];
        const cast = creditsRes.cast || [];

        const topCast = cast.slice(0, 10).map((c) => ({
            id: c.id,
            name: c.name,
            profile: c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
                : null,
        }));

        const topCrew = crew.slice(0, 10).map((c) => ({
            id: c.id,
            name: c.name,
            job: c.job,
            profile: c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
                : null,
        }));

        const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images`, options).then(res => res.json());

        const director = crew.find((m) => m.job === "Director")?.name || "Not available";
        const producer = crew.find((m) => m.job === "Producer")?.name || "Not available";

        const originalLangFull = languageMap[movieDetails.original_language] || movieDetails.original_language;

        const allLanguages = (movieDetails.spoken_languages || []).map(
            (lang) => languageMap[lang.iso_639_1] || lang.name
        );

        const logos = imagesRes.logos || [];
        const logo_url = logos.length > 0
            ? `https://image.tmdb.org/t/p/original${logos[0].file_path}`
            : null;
        const recommendationsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/recommendations`, options).then(res => res.json());

        const recommendedMovies = recommendationsRes.results
            .filter(movie => movie.poster_path && movie.genre_ids)
            .slice(0, 15)
            .map(movie => ({
                id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: movie.vote_average,
                genre: movie.genre_ids.map(id => genreMap[id]),
            }));

        const reviews = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/reviews?language=en-US&page=1`, options)
            .then(res => res.json())


        

        const videos = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`, options)
            .then(res => res.json())

        return {
            id: movieDetails.id,
            title: movieDetails.title,
            description: movieDetails.overview,
            poster_url: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
            backdrop_url: `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`,
            title_logo: logo_url,
            release_date: movieDetails.release_date,
            release_year: movieDetails.release_date?.split("-")[0],
            runtime: movieDetails.runtime,
            genres: movieDetails.genres.map(g => g.name),
            rating: movieDetails.vote_average,
            director,
            producer,
            original_language: originalLangFull,
            imdb_id: ids.imdb_id,
            spoken_languages: allLanguages,
            reviews: reviews.results,
            cast: topCast,
            crew: topCrew,
            recommended: recommendedMovies,
            trailer_url: videos.results.filter(video => video.type === "Trailer").map(video => `https://www.youtube.com/watch?v=${video.key}`),
        };
    } catch (err) {
        console.error("TMDB fetch error:", err.message);
    }
};


const getallmovies = async function (search, genre, language) {
    try {
        const token = Cookies.get("token");
        let tmdbUrl = "";
        const params = new URLSearchParams({
            api_key: api,
            language: "en-US",
            include_adult: "false",
        });

        if (search) {
            tmdbUrl = "https://api.themoviedb.org/3/search/movie";
            params.append("query", search);
        } else if (token) {
            tmdbUrl = "https://api.themoviedb.org/3/discover/movie";
            params.append("sort_by", "release_date.desc");
            params.append("with_original_language", localStorage.getItem("language"));
        } else {
            tmdbUrl = "https://api.themoviedb.org/3/movie/popular";
        }

        if (genre) params.append("with_genres", genre);
        if (language) params.set("with_original_language", language);

        const fullUrl = `${tmdbUrl}?${params.toString()}`;

        const response = await fetch(fullUrl, options);

        if (!response.ok) {
            throw new Error(`TMDB API responded with status ${response.status}`);
        }

        const data = await response.json()

        // const movies = data.results.map((movie) => ({
        //     id: movie.id,
        //     title: movie.title,
        //     rating: movie.vote_average,
        //     // posterurl: movie.poster_path
        //     //     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        //     //     : null,
        //     language: languageMap[movie.original_language],
        //     release_date: movie.release_date,
        // }));

        console.log(data)
    } catch (err) {
        console.error("TMDb error:", err.message);
    }
};


const getMovie = async (imdb_id) => {
    try {
        const ids = await fetch(`https://api.themoviedb.org/3/movie/${imdb_id}/external_ids`, options)
            .then(res => res.json())

        const tmdbId = ids.id

        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}`, options);

        if (!movieRes.ok) {
            throw new Error(`TMDB API responded with status `);
        }

        const movieDetails = await movieRes.json()

        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, options).then(res => res.json());

        const crew = creditsRes.crew || [];
        const cast = creditsRes.cast || [];

        const topCast = cast.slice(0, 10).map((c) => ({
            id: c.id,
            name: c.name,
            profile: c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
                : null,
        }));

        const topCrew = crew.slice(0, 10).map((c) => ({
            id: c.id,
            name: c.name,
            job: c.job,
            profile: c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
                : null,
        }));

        const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images`, options).then(res => res.json());

        const director = crew.find((m) => m.job === "Director")?.name || "Not available";
        const producer = crew.find((m) => m.job === "Producer")?.name || "Not available";

        const originalLangFull = languageMap[movieDetails.original_language] || movieDetails.original_language;

        const allLanguages = (movieDetails.spoken_languages || []).map(
            (lang) => languageMap[lang.iso_639_1] || lang.name
        );

        const logos = imagesRes.logos || [];
        const logo_url = logos.length > 0
            ? `https://image.tmdb.org/t/p/original${logos[0].file_path}`
            : null;
        const recommendationsRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/recommendations`, options).then(res => res.json());

        const recommendedMovies = recommendationsRes.results
            .filter(movie => movie.poster_path && movie.genre_ids)
            .slice(0, 15)
            .map(movie => ({
                id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: movie.vote_average,
                genre: movie.genre_ids.map(id => genreMap[id]),
            }));

        const reviews = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/reviews?language=en-US&page=1`, options)
            .then(res => res.json())


        

        const videos = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`, options)
            .then(res => res.json())

        return {
            id: movieDetails.id,
            title: movieDetails.title,
            description: movieDetails.overview,
            poster_url: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
            backdrop_url: `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`,
            title_logo: logo_url,
            release_date: movieDetails.release_date,
            release_year: movieDetails.release_date?.split("-")[0],
            runtime: movieDetails.runtime,
            genres: movieDetails.genres.map(g => g.name),
            rating: movieDetails.vote_average,
            director,
            producer,
            original_language: originalLangFull,
            imdb_id: ids.imdb_id,
            spoken_languages: allLanguages,
            reviews: reviews.results,
            cast: topCast,
            crew: topCrew,
            recommended: recommendedMovies,
            trailer_url: videos.results.filter(video => video.type === "Trailer").map(video => `https://www.youtube.com/watch?v=${video.key}`),
        };
    } catch (err) {
        console.error("TMDB fetch error:", err.message);
    }
};




export default { getSearchResults, getMovieById, getallmovies, getMovie };
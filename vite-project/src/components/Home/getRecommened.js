// import Cookies from 'js-cookie';

// const api = "3c3c1d1f41aba7ea370b09194c130360"
// const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzNjMWQxZjQxYWJhN2VhMzcwYjA5MTk0YzEzMDM2MCIsIm5iZiI6MTc1MzAwODEwOS4zMDMsInN1YiI6IjY4N2NjN2VkZGZmMDA4MWRhYzcyYzcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OZc2ftgzkSiEcFi9nL7WnYsXFGjG3NC9XR4q0HlGk0g"

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${token}`
//     }
// };

// const languageMap = {
//     "Telugu": "te",
//     "Hindi": "hi",
//     "English": "en",
//     "Tamil": "ta",
//     "Malayalam": "ml",
//     "Kannada": "kn",
//     "Marathi": "mr",
//     "Bengali": "bn",
//     "Punjabi": "pa",
//     "Gujarati": "gu",
//     "Odia": "or",
//     "Urdu": "ur",
// };

// const getHome = async function () {
//     try {
//         const lang = localStorage.getItem("language")
//         const userLang = lang || "en";

//         const baseUrl = "https://api.themoviedb.org/3";

//         const tmdbRequest = async (endpoint, params = {}) => {
//             const url = new URL(`${baseUrl}${endpoint}`);

//             url.searchParams.append("api_key", api);
//             url.searchParams.append("with_original_language", `${languageMap[userLang]}`);

//             Object.entries(params).forEach(([key, value]) => {
//                 url.searchParams.append(key, value);
//             });

//             const response = await fetch(url, options);
//             if (!response.ok) {
//                 throw new Error(`TMDb API error: ${response.status}`);
//             }

//             const data = await response.json();
//             return data.results;
//         };

//         const trending = await tmdbRequest("/trending/movie/week");
//         const popular = await tmdbRequest("/movie/popular");
//         const upcoming = await tmdbRequest("/movie/upcoming");

//         const genreFilters = {
//             comedy: 35,
//             action: 28,
//             adventure: 12,
//             romance: 10749,
//             crime: 80,
//         };

//         const genreRequests = await Promise.all(
//             Object.entries(genreFilters).map(([key, genreId]) =>
//                 tmdbRequest("/discover/movie", {
//                     with_genres: genreId,
//                     sort_by: "popularity.desc",
//                 }).then((movies) => ({
//                     key,
//                     movies,
//                 }))
//             )
//         );

//         const genreMovies = genreRequests.reduce((acc, { key, movies }) => {
//             acc[key] = movies
//                 .filter((m) => m.poster_path)
//                 .map((m) => ({
//                     id: m.id,
//                     posterurl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
//                     title: m.title,
//                     rating: m.vote_average,
//                     language: m.original_language,
//                     genre_ids: m.genre_ids,
//                     backdropurl: m.backdrop_path
//                         ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
//                         : null,
//                     description: m.overview,
//                 }));
//             return acc;
//         }, {});

//         const formatMovieList = (list) =>
//             list
//                 .filter((m) => m.backdrop_path)
//                 .map((m) => ({
//                     id: m.id,
//                     backdropurl: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
//                     title: m.title,
//                     rating: m.vote_average,
//                     language: m.original_language,
//                     genre_ids: m.genre_ids,
//                     description: m.overview,
//                     posterurl: m.poster_path
//                         ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
//                         : null,
//                 }));

//         const responsePayload = {
//             message: "Latest TMDB movies fetched",
//             banners: formatMovieList(trending),
//             recommended: formatMovieList(popular),
//             comingsoon: formatMovieList(upcoming),
//             comedy: genreMovies.comedy,
//             romance: genreMovies.romance,
//             actionAndAdventure: [...genreMovies.action, ...genreMovies.adventure].slice(0, 8),
//             crime: genreMovies.crime,
//         };

//         //console.log(responsePayload)
//         return responsePayload;
//     } catch (error) {
//         console.error("Error in Homepage:", error.message);

//     }
// };

// export default getHome;

import Cookies from 'js-cookie';

const api = "3c3c1d1f41aba7ea370b09194c130360";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzNjMWQxZjQxYWJhN2VhMzcwYjA5MTk0YzEzMDM2MCIsIm5iZiI6MTc1MzAwODEwOS4zMDMsInN1YiI6IjY4N2NjN2VkZGZmMDA4MWRhYzcyYzcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OZc2ftgzkSiEcFi9nL7WnYsXFGjG3NC9XR4q0HlGk0g";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

const languageMap = {
    "Telugu": "te", "Hindi": "hi", "English": "en", "Tamil": "ta", "Malayalam": "ml",
    "Kannada": "kn", "Marathi": "mr", "Bengali": "bn", "Punjabi": "pa", "Gujarati": "gu",
    "Odia": "or", "Urdu": "ur",
};

const reversedLanguageMap = Object.fromEntries(
    Object.entries(languageMap).map(([k, v]) => [v, k])
);

const getMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}&append_to_response=images`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch movie details for ID: ${movieId}`);
    return await res.json();
};

const formatMovies = async (movies) => {
    return await Promise.all(
        movies
            .filter((m) => m.poster_path)
            .map(async (m) => {
                let logos = null;
                try {
                    const detailed = await getMovieDetails(m.id);
                    logos = detailed?.images?.logos?.[0]?.file_path
                        ? `https://image.tmdb.org/t/p/w500${detailed.images.logos[0].file_path}`
                        : null;
                } catch (err) {
                    console.warn(`Logo fetch failed for movie ID ${m.id}`);
                }

                return {
                    id: m.id,
                    posterurl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                    title: m.title,
                    rating: m.vote_average,
                    language: reversedLanguageMap[m.original_language] || m.original_language,
                  languages: m.spoken_languages?.map(lang => lang.english_name) || [],

                    genre_ids: m.genre_ids,
                    backdropurl: m.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
                        : null,
                    description: m.overview,
                    logos,
                };
            })
    );
};

const getHome = async function () {
    try {
        const lang = localStorage.getItem("language");
        const userLang = lang || "en";

        const baseUrl = "https://api.themoviedb.org/3";

        const tmdbRequest = async (endpoint, params = {}) => {
            const url = new URL(`${baseUrl}${endpoint}`);
            url.searchParams.append("api_key", api);
            url.searchParams.append("with_original_language", `${languageMap[userLang]}`);
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`TMDb API error: ${response.status}`);
            }

            const data = await response.json();
            return data.results;
        };

        // Fetch raw data
        const [trending, popular, upcoming] = await Promise.all([
            tmdbRequest("/trending/movie/week"),
            tmdbRequest("/movie/popular"),
            tmdbRequest("/movie/upcoming"),
        ]);

        // Format top-level sections
        const banners = await formatMovies(trending);
        const recommended = await formatMovies(popular);
        const comingsoon = await formatMovies(upcoming);

        // Genre filter IDs
        const genreFilters = {
            comedy: 35,
            action: 28,
            adventure: 12,
            romance: 10749,
            crime: 80,
        };

        const genreRequests = await Promise.all(
            Object.entries(genreFilters).map(([key, genreId]) =>
                tmdbRequest("/discover/movie", {
                    with_genres: genreId,
                    sort_by: "popularity.desc",
                }).then((movies) => ({ key, movies }))
            )
        );

        const genreMovies = await genreRequests.reduce(async (accPromise, { key, movies }) => {
            const acc = await accPromise;
            acc[key] = await formatMovies(movies);
            return acc;
        }, Promise.resolve({}));

        const responsePayload = {
            message: "Latest TMDB movies fetched",
            banners,
            recommended,
            comingsoon,
            comedy: genreMovies.comedy,
            romance: genreMovies.romance,
            actionAndAdventure: [...genreMovies.action, ...genreMovies.adventure].slice(0, 8),
            crime: genreMovies.crime,
        };

        return responsePayload;
    } catch (error) {
        console.error("Error in Homepage:", error.message);
    }
};

export default getHome;
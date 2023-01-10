
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			movies: [],
			comingSoon: [],
			favourites: [],
			pending: [],
			searchedMovies: [],
			movieOfTheDay: [],
			seen: [],
			quotes: []
		},
		actions: {

			fetchMovies: async () => {
				const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=c5083e57bd8e698a2a69427a666f125f&primary_release_year=2022&include_video=true';

				const CONFIG = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}	
				}
				const response  = await fetch (API_URL, CONFIG)
				const json = await response.json();
				setStore({movies:json.results})
			},

			fetchComingSoon: async () => {
				const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=c5083e57bd8e698a2a69427a666f125f&primary_release_year=2023';
				//const API_URL_2 = 'https://imdb-api.com/en/API/ComingSoon/k_aq317h6s'
				const CONFIG = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}	
				}
				const response  = await fetch (API_URL, CONFIG)
				const json = await response.json();
			
				console.log(">>items>>", json)
				setStore({comingSoon:json.results})
			},


			fetchMovieOfTheDay: async () => {
				const API_URL = 'https://imdb-api.com/en/API/ComingSoon/k_aq317h6s';
				const API_URL_2 = `https://api.themoviedb.org/3/discover/movie?api_key=c5083e57bd8e698a2a69427a666f125f&vote_average.gte=8&append_to_response=videos`
				const empty = []
				const CONFIG = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}	
				}
				
				const response  = await fetch (API_URL_2, CONFIG)
				const json = await response.json();
					//empty.push(json)
				console.log(">>filtered>>", json)
				setStore({movieOfTheDay:json.results})
			},

			fetchQuotes: async () => {
				const API_URL = 'https://imdb-api.com/en/API/ComingSoon/k_aq317h6s';
				const API_URL_2 = 'https://93666e54-acff-43ca-acb2-c350c7777899-2t9j.gw.openapihub.com/movie-quote/random-quote&count=50'
				const empty = []
				const CONFIG = {
					method: "GET",
					headers: {
						"Content-type": "application/json",
						"X-OpenAPIHub-Key": "3df46caf2cc548da86a0e1b727f88e7a"
					}, 
				
				}
				
				const response  = await fetch (API_URL_2, CONFIG)
				const json = await response.json();
					//empty.push(json)
				console.log(">>quotes>>", json)
				setStore({quotes:json})
			},


			setFavourites: (poster_path) => {
				const store = getStore();
				setStore({favourites: [...store.favourites, poster_path]})
				console.log(store.favourites)
			},


			removeFavourite: (item) => {
				const store = getStore();
				setStore({ favourites: store.favourites.filter(movie => movie !== item) });
			},


			setPending: (poster_path) => {
				const store = getStore();
				setStore({pending: [...store.pending, poster_path]})
				console.log(store.pending)
			},

			setSeen: (poster_path) => {
				
				const store = getStore();
				setStore({seen: [...store.seen, poster_path]})
				
			},

			removeSeen: (item) => {
				const store = getStore();
				setStore({ seen: store.seen.filter(movie => movie !== item) });
			},

			removePending: (item) => {
				const store = getStore();
				setStore({ pending: store.pending.filter(movie => movie !== item) });
			},

				
			

		}
	};
};

export default getState;

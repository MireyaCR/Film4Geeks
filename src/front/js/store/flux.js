const API_KEY = process.env.TMDB_API;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			movies: [],
			comingSoon: [],
			favourites: [],
			pending: [],
			movieOfTheDay: [],
			seen: [],
		},
		actions: {

			fetchMovies: async () => {
				const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&primary_release_year=2022&include_video=true`;

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
				const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&primary_release_year=2023`;
			
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
				const API_URL_2 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_average.gte=8&append_to_response=videos`
	
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

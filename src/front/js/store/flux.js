const API_KEY = process.env.TMDB_API;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:null,
			message: null,
			movies: [],
			comingSoon: [],
			favourites: [],
			pending: [],
			movieOfTheDay: [],
			seen: [],
		},
		actions: {


			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token ")
				setStore({token:token})
			},

			login: async (email, password) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
		
				var raw = JSON.stringify({
				"email": email,
				"password": password
				});
		
				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};
		
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, requestOptions)
	
					if (resp.status !== 200){
						alert("There has been some error")
						return false
					}

					const data = await resp.json()
					console.log("esto viene del backend",data)
					sessionStorage.setItem("token",data.access_token)
					setStore({token:data.access_token})
						return true
		
				}catch(error) {
					console.log("There was an error!!!",error)
				}
			},

			logout:()=>{
				const token = sessionStorage.removeItem("token")
				console.log("login out")
				store.token = null
				
			},

			appendToken: () => {
				const store = getStore()
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				}
				fetch(`${process.env.BACKEND_URL}/api/token`, opts)
				.then(response => {
					console.log("apendToken")
					return response.json()
				}
					
					
				)
				.then(data => setStore({message: data.message}))
				.catch(error => (console.log("error", error)))
			},
			
			// LLamadas a la API
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

			getDbFav: async (film_id) => {
				const store = getStore();
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token						
					}
				};

				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favourite/?film_id=${film_id}`, opts)
					const data = await resp.json()	
					console.log(data)
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},

			getDbSeen: async (film_id) => {
				const store = getStore();
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token						
					}
				};

				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/seen/?film_id=${film_id}`, opts)
					const data = await resp.json()	
					console.log(data)
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},

			getDbPend: async (film_id) => {
				const store = getStore();
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token						
					}
				};

				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/pending/?film_id=${film_id}`, opts)
					const data = await resp.json()	
				
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},

			addDbSeen: async (id) => {
				const store = getStore();
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
						
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
				const resp = await fetch(`${process.env.BACKEND_URL}/api/user/seen`, opts)
				const data = await resp.json()	
				return data
				}
				catch (error){
					console.log("there has been an error",error)
				}
			},

			addDbFav: async (id) => {
				const store = getStore();
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
						
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favourite`, opts)
					const data = await resp.json()	
					return data
				}
				catch (error){
					console.log("there has been an error",error)
				}
			},

			addDbPending: async (id) => {
				const store = getStore();
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
				const resp = await fetch(`${process.env.BACKEND_URL}/api/user/pending`, opts)
				const data = await resp.json()	
				return data
				}
				catch (error){
					console.log("there has been an error",error)					
				}
			},

			deleteFav: async(id)=>{
				const store = getStore();
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favourite/?film_id=${id}`, opts)
					const data = await resp.json()	
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},

			deleteSeen: async(id)=>{
				const store = getStore();
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/seen/?film_id=${id}`, opts)
					const data = await resp.json()	
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},

			deletePending: async(id)=>{
				const store = getStore();
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					},
					body: JSON.stringify({
						film_id : id,
					})
				};
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/pending/?film_id=${id}`, opts)
					const data = await resp.json()	
					console.log("flux delete pending",data)
					return data
				}
				catch (error){
					console.log("there has been an error", error)
				}
			},
			
		}
	};
};

export default getState;

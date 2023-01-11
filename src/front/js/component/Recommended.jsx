import React, { useEffect } from 'react';
import axios from 'axios'
import { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import YouTube from 'react-youtube';
import '../../styles/recommended.css'


const Recommended = () => {
const {store, actions } = useContext(Context);
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "c5083e57bd8e698a2a69427a666f125f";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

  // variables de estado

  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api
  const fetchMovies = async () => {
   // const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c5083e57bd8e698a2a69427a666f125f&vote_average.gte=8', 
   );
    //console.log('data',results);
    //setSelectedMovie(results[0])

    setMovie(results[Math.floor(Math.random()*results.length)]);
 
    if(results.length){
        await fetchMovie(results[Math.floor(Math.random()*results.length)].id)
    }
  };

  const fetchMovie = async(id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
            api_key: API_KEY,
            append_to_response: "videos"
        }
    })

    if (data.videos && data.videos.results){
        const trailer = data.videos.results.find(
            (vid) => vid.name.includes("Trailer")
        )
        setTrailer(trailer ? trailer : data.video.results[0])
        
  }
  setMovie(data)
}


useEffect(() => {
fetchMovies();
}, []);

  return (
    
      <div className="container mt-3">
        <h2 className="mb-4">Recommended viewing...</h2>
            {movie ? (
            <div className="viewtrailer" style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}>
                <div>
                    <div className='info p-2'>
                    <h1>{movie.title}</h1>
                    <h4>{movie.overview}</h4>
                        <div>
                            {trailer ? (
                              !playing ? (
                            <button
                                className="close_one"
                                onClick={() => setPlaying(true)}
                                type="button"
                            >
                                Play Trailer
                            </button>
                              ) : (
                                null 
                              )
                            ) : (
                                "Sorry, no trailer available"
                            )}
                        </div>
                       </div> 
                </div>
              {playing ? (
                <div className='movie'>
                  <YouTube
                    videoId={trailer.key}
                    className="player"
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                   <button className="close" onClick={() => setPlaying(false)}>
                    Close
                  </button>
                </div>
                
              ) : (
                null
              )}
              
            </div>
          ) : null}
        
      </div>

  );
}

export default Recommended;
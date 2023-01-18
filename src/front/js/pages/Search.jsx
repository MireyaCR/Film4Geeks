import React, { useState } from 'react';
import "../../styles/search.css";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";


function Search(){
const [searchValue, setSearchValue] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);  

const search = () => { 

    const apiKey = process.env.TMDB_API;
    setIsLoading(true);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&language=en-US&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.error){
            setError(data.error);
        }else{
            setSearchResults(data.results);
        }
         setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      }); 
  };  
  return (
    <div>
        <div className="d-flex justify-content-center">
          <input type="text" className="rounded text-black" placeholder="Please enter your query" aria-label="Recipient's username" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
          <button className="btn btn-custom rounded-pill shadow" type="button" onClick={search}>Search</button>
          {isLoading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
        </div> 
        <div className="d-flex flex-wrap flex-row">    
            {searchResults.length > 0 ? (
              <div>{searchResults.map(result => (<div key={result.id} className="card result-card m-3">
                   <div className="card-container d-flex justify-content-end"> 
                       <img className="card-img-left" width ="150px" height= "200px"src={`${API_IMAGE}${result.poster_path}`} alt=""></img>
                      <div className="card-body ml-auto">
                        <h5 className="card-title-right ">{result.title}</h5>
                        <p className="cadr-text-right text-warning">{result.release_date}</p>
                        <p className="card-text-right text-warning">{result.overview}</p>
                      </div> 
                    </div>            
                  </div>
                ))}
              </div>
            ):'No results found'}
          </div>
    </div>
      )
 }
export default Search;
import React, { useState } from 'react';

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
      <input type="text" placeholder="Please enter your query" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      <button onClick={search}>Search</button>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}      
      {searchResults.length >0 && searchResults.map(result => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.release_date}</p>
            <p>{result.overview}</p>
          </div>
        ))}
    </div>
  );
}
export default Search;






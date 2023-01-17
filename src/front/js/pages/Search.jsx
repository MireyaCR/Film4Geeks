import React, { useState, useEffect } from 'react';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.TMDB_API;

  useEffect(() => {
    if(searchValue === '') {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&q=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [searchValue]);
  
  return (
    <div>
      <input type="text" placeholder="Ingrese su busqueda" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      {isLoading && <div>Cargando...</div>}
      {error && <div>{error.message}</div>}
      {
        searchResults.map(result => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.release_date}</p>
            <p>{result.overwiw}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Search;
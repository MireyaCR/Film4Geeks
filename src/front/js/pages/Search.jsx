import React, {useContext, useState, useEffect } from "react";
import LazyLoad from 'react-lazyload';
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import "../../styles/search.css";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";
import img404 from "/workspace/Film4Geeks/src/front/img/Imagenerror.png"
import { Link } from "react-router-dom";

function Search() {
  const {store, actions} = useContext(Context)
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate()
	
	useEffect(() => {
	 	if(!store.token)
		navigate("/login")
	
	}, [store.token])
 
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

  const search = () => {
    const apiKey = process.env.TMDB_API;
    setIsLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&language=en-US&page=1&include_adult=false`
    )
      // searchAction()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setSearchResults(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      })
      .finally(() => {
        setSearched(true);
      });
  };

  const sinopsys = (result) => {
    const overview = result.overview;
    return overview.length > 120 ? overview.substr(0, 120) + "..." : overview;
  };

  return (
    <div className="container-fluid justify-content-center">
      <div className="form-group">
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control rounded-input text-secondary"
            placeholder="Enter the title of the movie"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && search()}
          />
          <button
            className="btn btn-rounded btn-orange-gradient text-white fa fa-search"
            onClick={() => searchValue && search()}
            disabled={!searchValue}
          >        
          </button>
          {isLoading && <div className=" fa fa-spinner fa-spin"></div>}
          {error && <div className="mx-auto mt-3">{error.message}</div>}
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        {searchResults.length > 0 ? (
          <div className="card-deck">
            {searchResults.map((result) => (
              <div key={result.id} className="card result-card mt-2 w-75"style={{backgroundColor:"#132f4c"}}>                             
                  <div className="row justify-content-center">
                    <div className="col-sm-3 me-0" >  
                      <Link to={`/detailspopular/${result.id}`}>
                        <img className="card-img-left img-fluid "  src={`${API_IMAGE}${result.poster_path}`} style={{ maxWidth: "200px",height: "200px" }} onError={(e)=>{e.target.src=img404}}></img>
                      </Link>                   
                    </div>
                    <div className="col-sm-9 ms-0"style={{height: "100%"}}>
                        <div className="card-body w-100"style={{alignItems: "center"}}>
                          <h6 className="card-title text-info">{result.title}</h6>
                          <small className="text-muted">{result.release_date}</small>  
                          <h6 className="card-text text-warning"><small>{sinopsys(result)}</small></h6>               
                        </div>                 
                      </div>
                 </div>                                 
              </div>
            ))}
          </div>
        ) : !searched ? (
          ""
        ) : (
          <h3 className="mx-auto mt-3">"No results found"</h3>
        )}
      </div>
    </div>
  );
}
export default Search;

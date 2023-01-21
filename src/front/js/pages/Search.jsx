import React, {useContext, useState, useEffect } from "react";
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import "../../styles/search.css";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";
import imgerror from "/workspace/Film4Geeks/src/front/img/Imagenerror.png";
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
    <div className="container mx-auto">
      <div className="form-group">
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control rounded-input text-warning"
            placeholder="Please enter your query"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && search()}
          />
          <button
            className="btn btn-rounded btn-orange-gradient"
            onClick={() => searchValue && search()}
            disabled={!searchValue}
          >
            Search
          </button>
          {isLoading && <div className="mt-5">"Loading..."</div>}
          {error && <div className="mx-auto mt-3">{error.message}</div>}
        </div>
      </div>
      <div className="d-flex flex-wrap flex-row">
        {searchResults.length > 0 ? (
          <div className="card-deck mx-auto">
            {searchResults.map((result) => (
              <div key={result.id} className="card result-card m-2 ">
                <div
                  className="card-container d-flex justify-content-end colores"
                  style={{ height: "200px" }}
                >
                  <Link to={`/detailspopular/${result.id}`}>
                    <img
                      className="img-fluid "
                      src={`${API_IMAGE}${result.poster_path}`}
                      style={{
                        objectFit: "cover",
                        width: "150px",
                        height: "200px",
                        maxWidth: "100%",
                        maxHeight: "200px",
                      }}
                      alt=""
                    ></img>
                  </Link>
                  <div className="card-body ml-auto">
                    <h5 className="card-title-right carline">{result.title}</h5>
                    <p className="cadr-text-right carline text-warning">
                      {result.release_date}
                    </p>
                    <p className="card-text-right carline text-warning">
                      {sinopsys(result)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !searched ? (
          ""
        ) : (
          <div className="mx-auto mt-3">"No results found"</div>
        )}
      </div>
    </div>
  );
}
export default Search;

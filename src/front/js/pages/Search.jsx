import React, { useState } from "react";
import "../../styles/search.css";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = () => {
    const apiKey = process.env.TMDB_API;
    setIsLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&language=en-US&page=1&include_adult=false`
    )
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
      });
  };

  const sinopsys = (result) => {
    const overview = result.overview;
    return overview.length > 120 ? overview.substr(0, 120) + "..." : overview;
  };

  return (
    <div className="container mx-auto">
      <form>
        <div className="form-group">
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control rounded-input"
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
            {isLoading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
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
                    <div className="card-body ml-auto">
                      <h5 className="card-title-right ">{result.title}</h5>
                      <p className="cadr-text-right text-warning">
                        {result.release_date}
                      </p>
                      <p className="card-text-right text-warning">
                        {sinopsys(result)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
export default Search;



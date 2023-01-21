import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";

export const Prueba = () => {
  const { store, actions } = useContext(Context);
  const [films, setFilms] = useState([]);

  const getFavourites = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
    const url_to_get_favorites =
      process.env.BACKEND_URL + "/api/user/favourite";
    const response = await fetch(url_to_get_favorites, options);
    const data = await response.json();
    setFilms(data);
  };

  return (
    <div>
      <h2>Favoritos</h2>
      <button
        onClick={() => {
          getFavourites();
        }}
      >
        hola
      </button>

      <div>
        {films.map((element, index) => {
          return (
            <div key={index}>
              <img src={element.image_url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

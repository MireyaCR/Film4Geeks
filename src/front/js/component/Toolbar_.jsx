import propTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "/workspace/Film4Geeks/src/front/styles/toolbar_.css";

const Toolbar_ = (props) => {
  const [favo, setFavo] = useState(false);
  const [seen, setSeen] = useState(false);
  const [pend, setPend] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {

    const getFavourite = async () => {
      try {
        const data = await actions.getDbFav(props.idFilm);
        setFavo(data?.status === 200);
      } catch (error) {
        console.log(error);
      }
    };
    getFavourite();

    const getSeen = async () => {
      try {
        const data = await actions.getDbSeen(props.idFilm);
        setSeen(data?.status === 200);
      } catch (error) {
        console.log(error);
      }
    };
    getSeen();

    const getPend = async () => {
      try {
        const data = await actions.getDbPend(props.idFilm);
        setPend(data?.status === 200);
      } catch (error) {
        console.log(error);
      }
    };
    getPend();
  }, []);

  const addFavo = async () => {
    const data = await actions.addDbFav(props.idFilm);
    if (data.status === 200) {
      setFavo(true);
    } else {
      console.error(data);
    }
  };

  const deleteFavo = async () => {
    const data = await actions.deleteFav(props.idFilm);
    if (data.status === 200) {
      setFavo(false);
    } else {
      console.error(data);
    }
  };

  const addSeen = async () => {
    const data = await actions.addDbSeen(props.idFilm);
    if (data.status === 200) {
      setSeen(true);
    } else {
      console.error(data);
    }
  };

  const deleteSeen = async () => {
    const data = await actions.deleteSeen(props.idFilm);
    if (data.status === 200) {
      console.log("DELETE",data)
      setSeen(false);
    } else {
      console.error("DELETE",data);
    }
  };

  const addPending = async () => {
    const data = await actions.addDbPending(props.idFilm);
    console.log("post pending",data)
    if (data.status === 200) {
      setPend(true);
    } else {
      console.error(data);
    }
  };

  const deletePending = async () => {
    const data = await actions.deletePending(props.idFilm);
    if (data.status === 200) {
      console.log("DELETE",data)
      setPend(false);
    } else {
      console.error("DELETE",data);
    }
  };

  return (
    <div className="container d-flex justify-content-around">
      <button
        className={seen ? "fas fa-check p-2 m-1 yes" : "fas fa-check p-2 m-1 no"}
        onClick={() => {
          if (seen) {
            deleteSeen();
          } else {
            addSeen();            
          }
        }}
      ></button>
      <button
        className={favo ? "fas fa-star p-2 m-1 yes" : "far fa-star p-2 m-1 no"}
        onClick={() => {
            if (favo) {
                deleteFavo();
              } else {
                addFavo();            
              }
        }}
      ></button>
      <button
        className={pend ? "fas fa-flag p-2 m-1 yes" : "fas fa-flag p-2 m-1 no"}
        onClick={() => {
          if (pend) {
            deletePending();
          } else {
            addPending();            
          }
        }}
      ></button>
    </div>
  );
};
Toolbar_.propTypes = {
  idFilm: propTypes.number.isRequired,
};

export default Toolbar_;

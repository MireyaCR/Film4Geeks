import propTypes from "prop-types";
import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";

import "/workspace/Film4Geeks/src/front/styles/toolbar_.css"

const Toolbar_ = (props) => {
    const [favo,setFavo]=useState(false);
    const [seen,setSeen]=useState(false);
    const {store, actions} = useContext(Context)

    useEffect(() => {
        const getFavourite = async () => {
            try {
                const data = await actions.getDbFav(props.idFilm)
                console.log(data)
                setFavo(data?.status===200)
            } catch (error) {
                console.log(error)
            }
        }
        getFavourite()
        const getSeen = async () => {
            try {
                const data = await actions.getDbSeen(props.idFilm)
                console.log(data)
                setSeen(data?.status===200)
            } catch (error) {
                console.log(error)
            }
        }
        getSeen()
        
    }, []);
    
    return (
        <div className="container">
            <button className={seen ? "fas fa-check p-2 see":"fas fa-check p2 nosee"}></button>
            <button className={favo ? "fas fa-star p-2 favi":"far fa-star p-2 nofavi"}></button>
              <span className="fas fa-flag p-2 "></span>
        </div>
    )
}
Toolbar_.propTypes ={
    idFilm: propTypes.number.isRequired
};

export default Toolbar_
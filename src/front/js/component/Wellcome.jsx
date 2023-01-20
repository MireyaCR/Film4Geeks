import React from "react";
import { Link } from "react-router-dom";
import Well from "../../img/Well.png"

const Wellcome = () => {
    return(
        <>
        <img className="img-fluid" src={Well} alt="" style={{
            objectFit: 'cover',
            width: '100%',
            height: '100vh'
        }} />

        <div className="btn-container">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
        </div>
        </>
    )
}
export default Wellcome; 
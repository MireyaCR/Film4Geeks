import React from "react";
import { Link } from "react-router-dom";
import Well from "../../img/Well.png";
import "/workspace/Film4Geeks/src/front/styles/wellcome.css";

const Wellcome = () => {
  return (
    <div>
      <div className="container">
        <img
          className="img-fluid"
          src={Well}
          alt=""
          style={{ objectFit: "cover", height: "100vh" }}
        />
      </div>
      <div className="btn-container-well">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};
export default Wellcome;

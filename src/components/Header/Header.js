import Logo from "../../assets/Vinted_logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Switch from "../Switch/Switch";
// import { useState } from "react";

const Header = ({
  userToken,
  setUserToken,
  setTitle,
  title,
  priceMax,
  setPriceMax,
  // setUser
}) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={Logo} alt="logo du super site Vinted" />
        </Link>
        <input
          type="text"
          placeholder="Recherche des articles"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Prix maximum"
          value={priceMax}
          onChange={(event) => {
            setPriceMax(event.target.value);
          }}
        />
        <Switch />
        {userToken ? (
          <button
            onClick={() => {
              Cookies.remove("token");
              setUserToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link className="link" to="/signup">
              S'inscrire
            </Link>
            <Link className="link" to="/login">
              Se connecter
            </Link>
          </>
        )}

        <Link className="link" to="/publish">
          Vends tes articles
        </Link>
      </div>
    </header>
  );
};

export default Header;

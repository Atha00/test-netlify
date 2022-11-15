import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

const Signup = ({
  userToken,
  setUserToken,
  // setUser
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(true);
  const [isRequestPerforming, setIsRequestPerforming] = useState(false);

  const isDisabled = (username, email, password) => {
    if (username && email && password) {
      if (!isRequestPerforming) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  return userToken ? (
    <Navigate to="/" />
  ) : (
    <main className="form-signup">
      <h2>S'incrire</h2>
      {/* A la validation du formulaire :
        - on veut envoyer les données au backend (via une requete axios)
        - on devrait obtenir un token dans la réponse à notre requete
        - on stocke ce token dans les cookies */}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            setIsRequestPerforming(true);
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                email, // equivaut à email: email
                username: username,
                password: password,
                newsletter: newsLetter,
              }
            );
            // console.log("response.data =>", response.data);
            const token = response.data.token;
            // setUser(token)
            setUserToken(token);
            Cookies.set("token", token);
            setIsRequestPerforming(false);
            navigate("/");
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="checkbox"
          checked={newsLetter}
          onChange={() => {
            setNewsLetter((prev) => !prev);
          }}
        />
        <button disabled={isDisabled(username, email, password)}>
          S'inscrire
        </button>
      </form>
    </main>
  );
};

export default Signup;

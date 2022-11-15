import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({
  userToken,
  setUserToken,
  setUsername,
  // setUser
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("cwam10@gmail.com");
  const [password, setPassword] = useState("azerty");

  return (
    <main className="form-signup">
      <h2>Se connecter</h2>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              {
                email, // equivaut à email: email
                password: password,
              }
            );
            console.log("response.data =>", response.data);
            const token = response.data.token;
            const username = response.data.account.username;
            // setUser(token);
            Cookies.set("token", token);
            setUserToken(token);
            setUsername(username);
            navigate("/");
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
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

        <button>Se connecter</button>
      </form>
    </main>
  );
};

export default Login;

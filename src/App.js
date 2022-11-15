import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");

  // créer vos states pour les filtres ICI
  const [title, setTitle] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // qui dit useEffect dit isLoading
  const [isLoading, setIsLoading] = useState(true);

  let filters = "";
  if (title) {
    filters = filters + `?title=${title}`;
  }

  if (priceMax) {
    if (filters) {
      filters = filters + `&priceMax=${priceMax}`;
    } else {
      filters = filters + `?priceMax=${priceMax}`;
    }
  }
  // if (priceMin) {
  //   etc...
  // }

  useEffect(() => {
    // créer fonction async pour pouvoir utiliser async/await
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers${filters}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [filters]);

  // const setUser = (possibleToken) => {
  //   if (possibleToken === null) {
  //     Cookies.remove("token");
  //     setUserToken(null);
  //   } else {
  //     Cookies.set("token", possibleToken);
  //     setUserToken(possibleToken);
  //   }
  // };
  return (
    <div className="App">
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <Router>
          <Header
            userToken={userToken}
            setUserToken={setUserToken}
            setTitle={setTitle}
            title={title}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            // setUser={setUser}
          />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route
              path="/offer/:id"
              element={<Offer userToken={userToken} />}
            />
            <Route
              path="/signup"
              element={
                <Signup
                  userToken={userToken}
                  setUserToken={setUserToken}
                  // setUser={setUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  userToken={userToken}
                  setUserToken={setUserToken}
                  setUsername={setUsername}
                  // setUser={setUser}
                />
              }
            />
            <Route
              path="/publish"
              element={<Publish userToken={userToken} />}
            />
            <Route
              path="/payment"
              element={<Payment userToken={userToken} username={username} />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;

import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ userToken }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return userToken ? (
    isLoading ? (
      <p>{"Un peu de patience =)"}</p>
    ) : (
      <main className="product-details">
        <img src={data.product_image.secure_url} alt="apercu de la fringue" />
        <div>
          <div className="upper-offer-details">
            <p className="offer-details-price">{data.product_price} €</p>
            {/* <p>
          <span>MARQUE</span>
          <span>{data.product_details[0].MARQUE}</span>
        </p>
        <p>
          <span>TAILLE</span>
          <span>{data.product_details[1].TAILLE}</span>
        </p>
        <p>
          <span>ETAT</span>
          <span>{data.product_details[2]["ÉTAT"]}</span>
        </p>
        <p>
          <span>COULEUR</span>
          <span>{data.product_details[3].COULEUR}</span>
        </p>
        <p>
          <span>EMPLACEMENT</span>
          <span>{data.product_details[4].EMPLACEMENT}</span>
        </p> */}
            {data.product_details.map((element, index) => {
              return (
                <p key={index}>
                  <span>{Object.keys(element)}</span>
                  <span>{Object.values(element)}</span>
                </p>
              );
            })}
          </div>
          <div className="payment-button-container">
            <Link
              to="/payment"
              className="link"
              state={{ price: data.product_price, title: data.product_name }}
            >
              Acheter
            </Link>
          </div>
        </div>
      </main>
    )
  ) : (
    <Navigate to="/signup" />
  );
};

export default Offer;

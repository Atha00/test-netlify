import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ userToken, username }) => {
  const location = useLocation();
  const { price, title } = location.state;
  console.log(price, title);
  return userToken ? (
    <main className="payment">
      <h3>Résumé de la commande</h3>
      <p>{`Commande ${price} €`}</p>
      <p>Frais protection acheteurs 0.40 €</p>
      <p>Frais de port 0.80 €</p>
      <p>{`Total ${price + 1.2} €`}</p>

      <p className="payment-label">{`Vous allez vous offrir ${title}`}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          username={username}
          title={title}
          totalPrice={price + 1.2}
        />
      </Elements>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;

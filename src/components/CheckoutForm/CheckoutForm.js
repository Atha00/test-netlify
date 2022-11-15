import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ username, totalPrice, title }) => {
  const [paymentIsDone, setPaymentIsDone] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  return paymentIsDone ? (
    <p>Votre paiement a bien été effectué !</p>
  ) : (
    <div className="card-container">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // récupération des infos de la carte :
          const cardInfos = elements.getElement(CardElement);
          //   console.log(cardInfos);
          // récupération du token pour le paiement, via une requête à Stripe :
          const stripeResponse = await stripe.createToken(cardInfos, {
            name: username,
          });

          const stripeToken = stripeResponse.token.id;
          // requête au serveur pour effectué le paiement
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/payment",
            {
              title: title,
              token: stripeToken,
              amount: totalPrice,
            }
          );
          console.log(response.data.status);

          if (response.data.status === "succeeded") {
            // si le paiement a bien été effectué, on change le state :
            setPaymentIsDone(true);
          }
        }}
      >
        <CardElement />
        <button>Payer</button>
      </form>
    </div>
  );
};

export default CheckoutForm;

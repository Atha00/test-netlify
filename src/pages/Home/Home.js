import { Link } from "react-router-dom";

const Home = ({ data }) => {
  const orderingDetails = (product_details) => {
    const details = [];
    for (let i = 0; i < product_details.length; i++) {
      // console.log(Object.keys(product_details[i])); // {TAILLE: 'S / 36 / 8'} puis {ÉTAT: 'TRÈS BON ÉTAT'} etc...
      if (Object.keys(product_details[i])[0] === "TAILLE") {
        details.unshift(<p key={i}>{product_details[i]["TAILLE"]}</p>);
      } else if (Object.keys(product_details[i])[0] === "MARQUE") {
        details.push(<p key={i}>{product_details[i]["MARQUE"]}</p>);
      }
    }
    return details;
  };

  return (
    <main>
      {data.offers.map((offer) => {
        // console.log(offer);
        return (
          <Link to={`/offer/${offer._id}`} className="link" key={offer._id}>
            <article>
              <div className="owner-details">
                {offer.owner && offer.owner.account.avatar && (
                  <img
                    className="avatar"
                    src={offer.owner.account.avatar.secure_url}
                    alt="apercu du vendeur"
                  />
                )}
                {offer.owner && <p>{offer.owner.account.username}</p>}
              </div>
              <img
                src={offer.product_image.secure_url}
                alt="apercu de la fringue"
              />
              <p>{offer.product_name}</p>
              <p>{offer.product_price} €</p>
              {orderingDetails(offer.product_details)}
              {/* {offer.product_details.map((element) => {
              return (
                <>
                  <p>{element["TAILLE"]}</p>
                  <p>{element["MARQUE"]}</p>
                </>
              );
            })} */}
              {/* <p>{offer.product_details[1]["TAILLE"]}</p>
            <p>{offer.product_details[0]["MARQUE"]}</p> */}
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default Home;

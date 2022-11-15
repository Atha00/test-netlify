import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(null);
  const [file, setFile] = useState(null);
  return userToken ? (
    <main className="publish-form">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("price", price);
          formData.append("picture", file);

          // VERIFIER LES PAIRES CLEFS / VALEURS DU FORMDATA

          //   for (let pair of formData.entries()) {
          //     console.log(pair[0] + ", " + pair[1]);
          //   }
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${userToken}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <div>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Décris ton article</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="size">Taille</label>
          <input
            type="text"
            id="size"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="color">Couleur</label>
          <input
            type="text"
            id="color"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="condition">État</label>
          <input
            type="text"
            id="condition"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="city">Lieux</label>
          <input
            type="text"
            id="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <button>Ajouter</button>
      </form>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;

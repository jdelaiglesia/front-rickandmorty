import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { filterCards, orderCards } from "../redux/actions";
import axios from "axios";
import Card from "./Card";

import "../styles/Cards.css";
import "../styles/Favorites.css";

export const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export const Favorites = ({ myFavorites }) => {
  console.log(myFavorites);
  const location = useLocation();
  const dispatch = useDispatch();

  const [aux, setAux] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const URL = "/rickandmorty/fav";
      await axios
        .get(URL)
        .then(({ data }) => {
          dispatch({ type: "GET_FAV", payload: data });
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    };

    if (location.pathname === "/favorites") {
      fetchFavorites();
    }
  }, [location]); // El array vacío asegura que fetchFavorites se llame solo cuando el componente se monta

  const handleOrder = (e) => {
    setAux(!aux);
    dispatch(orderCards(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterCards(e.target.value));
  };
  return (
    <div>
      <select
        className="favoritesDropdown"
        name="filter"
        id="filterSelect"
        onChange={handleFilter}
      >
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <select
        className="favoritesDropdown"
        name="order"
        id="orderSelect"
        onChange={handleOrder}
      >
        <option value="A">Ascendant</option>
        <option value="D">Descendant</option>
      </select>
      <div className="cardsContainer">
        {myFavorites?.map(
          ({ id, name, status, gender, image, origin, species, onClose }) => (
            <Card
              id={id}
              name={name}
              status={status}
              gender={gender}
              image={image}
              origin={origin}
              species={species}
              onClose={onClose}
              disableOnClose={true}
            />
          )
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Favorites);

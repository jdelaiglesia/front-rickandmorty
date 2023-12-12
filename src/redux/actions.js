import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";
import axios from "axios";
const URL =
  "https://back-rickandmorty-production.up.railway.app/rickandmorty/fav";

const addFav = (character) => {
  return async (dispatch) => {
    await axios.post(URL, character).then(({ data }) => {
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    });
  };
};

const removeFav = (id) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/${id}`).then(({ data }) => {
      return dispatch({
        type: REMOVE_FAV,
        payload: data.favorites,
      });
    });
  };
};

const filterCards = (gender) => {
  return { type: FILTER, payload: gender };
};

const orderCards = (orderParameter) => {
  return { type: ORDER, payload: orderParameter };
};

export { addFav, removeFav, filterCards, orderCards };

import { GET_FAV, ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };
    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };
    case FILTER:
      if (action.payload === "All") {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      }
      let filtered = state.allCharacters.filter((character) => {
        return character.gender === action.payload;
      });
      return {
        ...state,
        myFavorites: filtered,
      };
    case ORDER:
      let sorted;
      if (action.payload === "A") {
        sorted = state.allCharacters.sort((a, b) => a.id - b.id);
      } else if (action.payload === "D") {
        sorted = state.allCharacters.sort((a, b) => b.id - a.id);
      } else {
        sorted = state.allCharacters;
      }
      return {
        ...state,
        myFavorites: sorted,
      };
    default:
      return { ...state };
  }
};

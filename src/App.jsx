import { API_URL } from "./constants";

import axios from "axios";
import { useState, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import Cards from "./components/Cards";
import Nav from "./components/Nav";
import Detail from "./components/Detail";
import About from "./views/About";
import Error from "./views/Error";
import Favorites from "./components/Favorites";
import AdvancedSearch from "./components/AdvancedSearch";
import Form from "./components/Form";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://back-rickandmorty-production.up.railway.app";

const errorToast = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const AppTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * Main component of the Rick and Morty character showcase application.
 * Includes functionality for user authentication, searching and displaying characters, and navigating between different views.
 */
function App() {
  const [access, setAccess] = useState(false);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /**
   * Handles user login.
   * @param {Object} userData - User data containing email and password.
   */
  const login = async (userData) => {
    const { email, password } = userData;
    const URL = "/rickandmorty/login";
    await axios(URL + `?email=${email}&password=${password}`).then(
      ({ data }) => {
        const { access } = data;
        setAccess(access);
        if (access) {
          access && navigate("/home");
        } else {
          toast.error("Usuario y/o contraseña inválidos", errorToast);
        }
      }
    );
  };

  /**
   * Fetches the favorites from the database API and updates the global state.
   */
  const fetchFavorites = async () => {
    const URL = "/rickandmorty/fav";
    await axios
      .get(URL)
      .then(({ data }) => {
        // En lugar de setCharacters(data), envía una acción al store de Redux
        dispatch({ type: "ADD_FAV", payload: data });
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  };

  /**
   * Searches for a character by ID using the Rick and Morty API.
   * @param {number} id - Character ID.
   */
  const onSearch = async (id) => {
    await axios(`${API_URL}${id}`).then(({ data }) => {
      if (data.name) {
        if (characterAlreadyExists(data.id)) {
          toast.error("¡Este personaje ya fue agregado!", errorToast);
          return;
        }
        navigate("/home");
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        console.log(API_URL + id);
        toast.error("¡No hay personajes con este ID!", errorToast);
      }
    });
  };

  /**
   * Closes a character card.
   * @param {number} id - Character ID.
   */
  const onClose = (id) => {
    setCharacters((oldChars) =>
      oldChars.filter((character) => character.id !== id)
    );
  };

  /**
   * Checks if a character already exists in the list.
   * @param {number} id - Character ID.
   * @returns {boolean} - True if character already exists, false otherwise.
   */
  const characterAlreadyExists = (id) => {
    return characters.some((character) => character.id === id);
  };

  /**
   * Adds a random character to the list.
   */
  const addRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    if (!characterAlreadyExists(randomId)) {
      onSearch(randomId);
      navigate("/home");
    } else {
      addRandomCharacter();
    }
  };

  /**
   * Redirects to the login page if the user is not authenticated.
   */
  useMemo(() => {
    !access && navigate("/");
  }, [access]);

  useMemo(() => {
    fetchFavorites();
  }, []);

  return (
    <AppTag className="App">
      {location.pathname !== "/" && (
        <Nav onSearch={onSearch} addRandomCharacter={addRandomCharacter} />
      )}
      <h1 className="neonTitle">Rick and Morty Character Showcase</h1>
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/advancedSearch" element={<AdvancedSearch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route element={<Error />} />
      </Routes>
    </AppTag>
  );
}

export default App;

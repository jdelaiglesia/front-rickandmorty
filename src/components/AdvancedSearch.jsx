import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/AdvancedSearch.css";

const AdvancedSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState("");
  const [searchParams, setSearchParams] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
  });

  const fetchCharacters = async () => {
    try {
      const url = `https://rickandmortyapi.com/api/character?name=${searchParams.name}&status=${searchParams.status}&species=${searchParams.species}&gender=${searchParams.gender}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setResults(`0`);
        setCharacters({});
      }

      setResults(`${data.info.count}`);
      setCharacters(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Llama a fetchCharacters cuando se envía el formulario
    await fetchCharacters();
  };

  return (
    <div>
      <form className="searchContainer" onSubmit={handleSubmit}>
        <input
          className="searchInput"
          type="text"
          name="name"
          placeholder="Name"
          value={searchParams.name}
          onChange={handleInputChange}
        />
        <input
          className="searchInput"
          type="text"
          name="status"
          placeholder="Status"
          value={searchParams.status}
          onChange={handleInputChange}
        />
        <input
          className="searchInput"
          type="text"
          name="species"
          placeholder="Species"
          value={searchParams.species}
          onChange={handleInputChange}
        />
        <input
          className="searchInput"
          type="text"
          name="gender"
          placeholder="Gender"
          value={searchParams.gender}
          onChange={handleInputChange}
        />
        <button className="searchButton" type="submit">
          Search
        </button>
      </form>
      {results ? (
        <h2 className="resultsText">
          Se han encontrado {results} resultado/s.
        </h2>
      ) : (
        <></>
      )}
      {results > 30 ? (
        <h5 className="resultsText">(Sólo se muestran los primeros 30)</h5>
      ) : (
        <></>
      )}
      <div className="cardsContainer">
        {characters.length > 0 ? (
          characters.map((character) => (
            <Card
              id={character.id}
              name={character.name}
              status={character.status}
              gender={character.gender}
              image={character.image}
              origin={character.origin.name}
              species={character.species}
              disableOnClose={true}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;

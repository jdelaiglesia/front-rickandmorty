import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

import "../styles/Detail.css";

const Detail = () => {
  const [character, setCharacter] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${params.id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return setCharacter({});
  }, [params.id]);
  if (character.name) {
    return (
      <div className="detailContainer">
        <Tilt
          glareEnable="true"
          glareBorderRadius="100%"
          glareColor="#1f971fbf"
          glarePosition="all"
        >
          <img src={character.image} alt="" className="detailImage" />
        </Tilt>
        <div className="detailTextContainer">
          <p className="detailText">{character.name}</p>
          <p className="detailText">{character.status}</p>
          <p className="detailText">{character.species}</p>
          <p className="detailText">{character.gender}</p>
          <p className="detailText">{character.origin?.name}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="detailText">Cargando...</h2>
      </div>
    );
  }
};

export default Detail;

import { NavLink } from "react-router-dom";
import { addFav, removeFav } from "../redux/actions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Tilt from "react-parallax-tilt";

import "../styles/Card.css";

export function Card(props) {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      props.removeFav(props.id);
    } else {
      setIsFav(true);
      props.addFav(props);
    }
  };

  useEffect(() => {
    props.myFavorites?.forEach((fav) => {
      if (fav.id === props.id) {
        setIsFav(true);
      }
    });
  }, [props.myFavorites]);

  return (
    <Tilt perspective={500} scale={1} gyroscope={true}>
      <div className="cardContainer">
        <div className="cardPortalEffect" />
        {isFav ? (
          <button className="favButton" onClick={handleFavorite}>
            ❤️
          </button>
        ) : (
          <button className="favButton" onClick={handleFavorite}>
            🤍
          </button>
        )}
        {props.disableOnClose === false ? (
          <button
            className="cardButton"
            onClick={() => {
              props.onClose(props.id);
            }}
          >
            X
          </button>
        ) : (
          <></>
        )}
        <NavLink className="cardLink" to={`/detail/${props.id}`}>
          <img className="cardImage" src={props.image} alt="" />
        </NavLink>
        <NavLink className="cardLink" to={`/detail/${props.id}`}>
          {props.name}
        </NavLink>
        <p className="cardText">
          {(() => {
            switch (props.status) {
              case "Alive":
                return "👍 Alive";
              case "Dead":
                return "⚰️ Dead";
              case "unknown":
                return "❓ unknown";
              default:
                return props.status;
            }
          })()}
        </p>
        <p className="cardText">
          {(() => {
            switch (props.species) {
              case "Human":
                return "🙍‍♂️ Human";
              case "Alien":
                return "👽 Alien";
              case "Mythological Creature":
                return "🦄 Mythological Creature";
              case "Robot":
                return "🤖 Robot";
              case "Animal":
                return "🐕 Animal";
              case "Humanoid":
                return "👤 Humanoid";
              case "unknown":
                return "❓ unknown";
              default:
                return props.species;
            }
          })()}
        </p>
        <p className="cardText">
          {(() => {
            switch (props.gender) {
              case "Male":
                return "🚹 Male";
              case "Female":
                return "🚺 Female";
              case "unknown":
                return "❓ unknown";
              default:
                return props.gender;
            }
          })()}
        </p>
        <p className="cardText">{`🌌${props.origin}`}</p>
      </div>
    </Tilt>
  );
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },
    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
};

export const mapStateToProps = (state) => {
  return { myFavorites: state.myFavorites };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

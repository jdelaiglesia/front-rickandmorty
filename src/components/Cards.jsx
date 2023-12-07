import Card from "./Card";

import "../styles/Cards.css";

export default function Cards(props) {
  return (
    <div className="cardsContainer">
      {props.characters.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin.name}
          image={character.image}
          onClose={props.onClose}
          disableOnClose={false}
        />
      ))}
    </div>
  );
}

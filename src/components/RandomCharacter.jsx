import "../styles/RandomCharacter.css";

export default function RandomCharacter(props) {
  return (
    <button
      className="randomCharacterButton"
      onClick={props.addRandomCharacter}
    >
      Wubba lubba dub dub!
    </button>
  );
}

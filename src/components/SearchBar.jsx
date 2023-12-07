import { useState } from "react";

import "../styles/SearchBar.css";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");

  const handleChange = (id) => {
    setSearch(id);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.onSearch(search);
    }
  };

  return (
    <div>
      <input
        className="searchBarInput"
        type="text"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="searchBarButton"
        onClick={() => {
          props.onSearch(search);
        }}
      >
        Add character
      </button>
    </div>
  );
}

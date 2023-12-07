import SearchBar from "./SearchBar";
import RandomCharacter from "./RandomCharacter";
import { NavLink } from "react-router-dom";

import "../styles/Nav.css";

export default function Nav(props) {
  return (
    <nav className="navbarContainer">
      <div className="navbarButtonContainer">
        <div
          className={`navbarButton ${
            window.location.pathname === "/home" ? "navbarCurrent" : ""
          }`}
        >
          <NavLink className="navbarText" to="/home">
            Home
          </NavLink>
        </div>
        <div
          className={`navbarButton ${
            window.location.pathname === "/favorites" ? "navbarCurrent" : ""
          }`}
        >
          <NavLink className="navbarText" to="/favorites">
            Favorites
          </NavLink>
        </div>
        <div
          className={`navbarButton ${
            window.location.pathname === "/advancedSearch"
              ? "navbarCurrent"
              : ""
          }`}
        >
          <NavLink className="navbarText" to="/advancedSearch">
            Advanced Search
          </NavLink>
        </div>
        <div
          className={`navbarButton ${
            window.location.pathname === "/about" ? "navbarCurrent" : ""
          }`}
        >
          <NavLink className="navbarText" to="/about">
            About
          </NavLink>
        </div>
      </div>
      <div className="searchBarContainer">
        <SearchBar onSearch={props.onSearch} />
        <RandomCharacter addRandomCharacter={props.addRandomCharacter} />
      </div>
    </nav>
  );
}

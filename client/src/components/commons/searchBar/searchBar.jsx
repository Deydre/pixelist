import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [values, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Consultamos a la API externa buscando el slug
    let slug = values.trim().replace(/\s+/g, "-");
    // Pasamos el slug por la ruta
    navigate(`/games/${slug}`)
    setValue("");
  }

  return <div id="contentSearch">
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={values} onChange={handleChange} placeholder="🔍   Search a videogame!" required />
    </form>
    <div id="sortButtons">
      <button id="sortAlphabetical" className="btnSort">A</button>
      <button id="sortNewest" className="btnSort">n</button>
    </div>
  </div>;
};

export default SearchBar;

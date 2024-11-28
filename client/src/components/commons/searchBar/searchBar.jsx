import React from "react";
import { useContext, useState } from "react";

const SearchBar = () => {

  const [values, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Enviamos la búsqueda al estado "pokemons" del contexto a través de la función del contexto para que se sume a ese array
    // updatePokemons(values);
    setValue("");
  }
  return <div id="contentSearch">
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={values} onChange={handleChange} placeholder="🔍   Search a videogame!" required />
    </form>
    <div id="sortButtons">
      <button id="sortAlphabetical" class="btnSort">A</button>
      <button id="sortNewest" class="btnSort">n</button>
    </div>
  </div>;
};

export default SearchBar;

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
  return <>
    <form id= "searchOne" onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={values} onChange={handleChange} placeholder="🔍   Search a videogame!" required/>
    </form>
  </>;
};

export default SearchBar;

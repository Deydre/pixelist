import React, { useState, useContext, useEffect } from 'react';
import { context } from "../../../context/context"
import { useParams } from "react-router-dom";
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import Card from "../../commons/Card";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Category = () => {

  const routeParams = useParams();
  const { categories } = useContext(context);
  const apiKey = import.meta.env.VITE_API_KEY;

  const [videogamesList, setVideogamesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderCards = () => {
    return videogamesList.map((game, i) => <Card data={game} key={uuidv4()} />)
  }

  useEffect(() => {
    const getVideogames = async () => {
      setLoading(true);
      try {
        if (!categories || categories.length === 0) {
          console.error("Categories no está cargado todavía");
          return;
        }
        // Nada más entrar en la ruta de la categoría, cogemos por parámetro el slug y lo buscamos en nuestro estado global "categories" pasado por contexto
        let slug = routeParams.category;
        const categoryData = categories.find(category => category.slug === slug);

        // Recorremos el array de objetos de esta categoría (del estado categories) y hacemos llamadas a la API de cada juego para pintar la info
        const gameDetails = categoryData.games.map((gameSlug) => axios.get(`https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`));

        // En forma de promesas porque son varias llamadas a un endpoint (si no no encuentra gameDetails)
        const gameDetailsResponses = await Promise.all(gameDetails);

        // Almacenamos esa info en el estado igual que en Home
        setVideogamesList(gameDetailsResponses.map((resp) => resp.data));
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }
    getVideogames();
  }, [routeParams.category]); // Hacemos esto cada vez que cambie el parámetro category de la ruta

  return <section id="home">
    <CategoriesBar />
    <div id="contentHome">
      <SearchBar />
      <section id="contentCards">
        {loading ? <HashLoader color="#fff" /> : renderCards()}
      </section>
    </div>
  </section>;
};


export default Category;

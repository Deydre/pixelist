import React, { useContext, useState, useEffect } from 'react';
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import Card from "../../commons/Card";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// import PageContent from 
const Home = () => {

  const apiKey = import.meta.env.VITE_API_KEY;
  const [videogamesList, setVideogamesList] = useState([]);

  const renderCards = () => {
    return videogamesList.map((game, i) => <Card data={game} key={uuidv4()} />)
  }

  // FETCH INICIAL
  useEffect(() => {
    const getVideogames = async () => {
      try {
        const resp = await axios.get(`https://api.rawg.io/api/games?page=43871&key=${apiKey}`);
        console.log(resp.data.results)
        setVideogamesList(resp.data.results)
      } catch (err) {
        console.log(err)
      }
    }
    getVideogames();
  }, []);

  return <section id="home">
    <CategoriesBar/>
    <div id="contentHome">
      <SearchBar/>
      <section id="contentCards">
        {renderCards()}
      </section>
    </div>
  </section>;
};

export default Home;

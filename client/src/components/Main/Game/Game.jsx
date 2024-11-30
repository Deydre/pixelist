import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import DetailCard from "./DetailCard/DetailCard";
import { context } from "../../../context/context";
import axios from "axios";

const GameView = () => {

  const { favsUser } = useContext(context);
  const routeParams = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);

  const renderParamsCard = () => {
    // Comprobar si el juego está en los favoritos de este user para indicárselo (lo hacemos gracias al estago globar "favsUser")
    return <DetailCard data={gameData} key="1" />
  }

  // FETCH DEL PARAM
  useEffect(() => {
    const getGame = async () => {
      try {
        const resp = await axios.get(`https://api.rawg.io/api/games/${routeParams.game}?key=${apiKey}`);
        setGameData(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    getGame();
  }, []);

  return <section id="game">
    <CategoriesBar />
    <div id="contentGame">
      <SearchBar />
      <section id="contentCard">
        {renderParamsCard()}
      </section>
    </div>
  </section>;
};

export default GameView;

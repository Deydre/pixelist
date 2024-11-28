import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import DetailCard from "./DetailCard/DetailCard"
import axios from "axios";

const GameView = () => {

  const routeParams = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);

  const renderParamsCard = () => {
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

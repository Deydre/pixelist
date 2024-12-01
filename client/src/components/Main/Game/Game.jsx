import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import DetailCard from "./DetailCard/DetailCard";
import { context } from "../../../context/context";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

const GameView = () => {

  const { favsUser } = useContext(context);
  const routeParams = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);

  const renderParamsCard = () => {
    // Comprobar si el juego está en los favoritos de este user para indicárselo (lo hacemos gracias al estago global "favsUser")
    return <DetailCard data={gameData} key="1" />
  }

  // FETCH DEL PARAM
  useEffect(() => {
    const getGame = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`https://api.rawg.io/api/games/${routeParams.game}?key=${apiKey}`);
        setGameData(resp.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false);
    }
    getGame();
  }, []);

  return <section id="game">
    <CategoriesBar />
    <div id="contentGame">
      <SearchBar />
      <section id="contentCard">
          {loading ? ( 
            <HashLoader color="#fff" /> // Mostrar spinner mientras carga
          ) : (
            renderParamsCard()
          )}
        </section>
    </div>
  </section>;
};

export default GameView;

import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGift, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { context } from "../../../../context/context";
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";


const DetailCard = (game) => {

  const { profile, favsUser, updateFavsUser } = useContext(context);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const id_user = profile.id;

  // Manejo de datos que vienen por prop
  const { name, background_image, id, metacritic, description_raw, released, parent_platforms, genres } = game.data;
  let id_game = id;

  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";


  // Comprobar si el juego es favorito
  useEffect(() => {
    const isFav = favsUser.some((fav) => fav.id_game === id_game);
    setIsFavorite(isFav);
  }, []);

  const renderPlatforms = () => {
    return parent_platforms?.map((platform, i) => (
      <section key={i}>
        <p>{platform.platform.name}</p>
      </section>
    )) || <p>No platforms available 🤔</p>;
  };

  const renderGenres = () => {
    return genres?.map((genre, i) => (
      <section key={i}>
        <p>{genre.name}</p>
      </section>
    )) || <p>No genres available 🤔</p>;
  };

  // Comprobamos si el juego está marcado como favorito al cargar el componente
  const handleFavorite = async () => {
    setLoading(true);
    try {
      if (profile) {
        
        if (!isFavorite) {
          // COMPROBAMOS SI ES FAVORITO
          const favsUser = await axios(`http://localhost:3000/api/favorites/${profile.email}`);
          console.log(favsUser)
          // MIRAR SI EL JUEGO YA ESTÁ EN NUESTRA BBDD
          const gameExists = await axios(`http://localhost:3000/api/videogame/${id_game}`);
          // SI EL JUEGO NO EXISTE, LO CREAMOS EN NUESTRA BBDD
          if (!gameExists.data) {
            await axios({
              method: 'post',
              url: 'http://localhost:3000/api/videogame',
              data: { id, name, background_image },
              withCredentials: true
            });
            console.log("Juego creado en la BBDD: " + name);
          } else {
            console.log("Juego ya estaba creado en la BBDD: " + name);
          }

          // MARCAR COMO FAVORITO
          const date = new Date().toISOString().split('T')[0];
          // Buscar el email en el token y buscar la id en la BBDD
          await axios({
            method: 'post',
            url: 'http://localhost:3000/api/favorites/',
            data: { id_user, id_game, date },
            withCredentials: true
          });

          updateFavsUser(); 
          setIsFavorite(true);
          console.log("Marcando como favorito, id_game:", id_game);
          // Hasta aquí bien-------------------------------------
        } else {
          await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/favorites/',
            data: { id_user, id_game },
            withCredentials: true
          });
          updateFavsUser();
          setIsFavorite(false);
          console.log("Desmarcando como favorito, id_game:", id_game);
        }
      }

    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);

  };


  return <>
    <article className="cardDetailVideogame" id={id}>
      <div id="divImg">
        <img src={background_image} alt={name} />
      </div>
      <div id="divData">
        <div>
          <h2>{name}</h2>
          {profile ? (<>
            <article id="markers">
            <button className="divIcon" >
              <h6>COMPLETED</h6>
              <FontAwesomeIcon icon={faSquareCheck} size="sm" />
            </button>
            <button className="divIcon">
              <h6>WISHLISTED</h6>
              <FontAwesomeIcon icon={faGift} size="sm" />
            </button>
            <button
                className={`divIcon ${isFavorite ? 'favorite' : ''}`}
                onClick={handleFavorite}
                disabled={loading} // Desactivar el botón mientras se está cargando
              >
                {loading ? (
                  <HashLoader color="#fff" size={20} /> // Muestra el spinner mientras se está cargando
                ) : (
                  <>
                    <h6>FAVORITE</h6>
                    <FontAwesomeIcon icon={faHeart} size="sm" />
                  </>
                )}
              </button>
            <div className={`containerMetacritic ${colorMetacritic}`}>
              <h6>{metacritic}</h6>
            </div>
          </article>
          </>) : null}
        </div>
        <div>
          <p>{description_raw}</p>
        </div>
        <div className="cardInfoListParent">
          <h6>PLATFORMS</h6>
          <div className="cardInfoList">
            {renderPlatforms()}
          </div>
        </div>
        <div className="cardInfoListParent">
          <h6>GENRES</h6>
          <div className="cardInfoList">
            {renderGenres()}
          </div>
        </div>
        <div className="cardInfoListParent">
          <h6>RELEASED</h6>
          <div className="cardInfoList">
            <p>{released}</p>
          </div>
        </div>
      </div>


    </article>
  </>;
};

export default DetailCard;

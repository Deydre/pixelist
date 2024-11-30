import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGift, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { context } from "../../../../context/context";
import axios from 'axios';


const DetailCard = (game) => {

  const { actualUser, favsUser, updateFavsUser } = useContext(context);
  const [ isFavorite, setIsFavorite ] = useState(false);

  // Manejo de datos que vienen por prop
  const { name, background_image, id, metacritic, description_raw } = game.data;
  let id_game = id;


  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";


  // Comprobamos si el juego está marcado como favorito al cargar el componente
  useEffect(() => {
    const isAlreadyFavorite = favsUser.some(fav => fav.id_game === id_game);
    console.log("A VER", isAlreadyFavorite);
    setIsFavorite(isAlreadyFavorite);
  }, [favsUser, id_game]);


  const handleFavorite = async () => {
    try {
      // Llamada a la API para saber el ID del user con el email almacenado en actualUser
      const user = await axios(`http://localhost:3000/api/user/email?email=${actualUser}`);
      const id_user = user.data[0].id;

      if (user) {
        // Comprobar si está en favoritos
        if (!isFavorite) {
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

          updateFavsUser([...favsUser, {id_game: id_game}]);
          setIsFavorite(true);
        } else {
          await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/favorites/',
            data: { id_user, id_game },
          });
          updateFavsUser(favsUser.filter(fav => fav.id_game !== id_game)); 
          setIsFavorite(false);
        }    
      }

    } catch (error) {
      console.log(error.message);
    }

  };


  return <>
    <article className="cardDetailVideogame" id={id}>
      <div id="divImg">
        <img src={background_image} alt={name} />
      </div>
      <div id="divData">
        <div>
          <h2>{name}</h2>
          <article id="markers">
            <button className="divIcon" >
              <h6>COMPLETED</h6>
              <FontAwesomeIcon icon={faSquareCheck} size="sm" />
            </button>
            <button className="divIcon">
              <h6>WISHLISTED</h6>
              <FontAwesomeIcon icon={faGift} size="sm" />
            </button>
            <button className={`divIcon ${isFavorite ? 'favorite' : ''}`}
              onClick={handleFavorite} >
              <h6>FAVORITE</h6>
              <FontAwesomeIcon icon={faHeart} size="sm"/>
            </button>
            <div className={`containerMetacritic ${colorMetacritic}`}>
              <h6>{metacritic}</h6>
            </div>
          </article>
        </div>
        <div>
          <p>{description_raw}</p>
        </div>
      </div>


    </article>
  </>;
};

export default DetailCard;

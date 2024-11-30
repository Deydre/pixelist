import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGift, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { context } from "../../../../context/context";
import axios from 'axios';


const DetailCard = (game) => {

  const { actualUser, favsUser, updateFavsUser } = useContext(context);
  const [isFavorite, setIsFavorite] = useState(false);

  // Manejo de datos que vienen por prop
  const { name, background_image, id, metacritic, description_raw } = game.data;
  let id_game = id;

  useEffect(() => {
    // Calculamos si el juego está en favoritos sólo cuando cambien favsUser o id_game
    const booleanFavorite = favsUser.some(fav => fav.id_game === id_game);
    setIsFavorite(booleanFavorite);
  }, [favsUser, id_game]);


  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";


  const handleFavorite = async () => {
    try {
      // Llamada a la API para saber el ID del user con el email almacenado en actualUser
      const user = await axios(`http://localhost:3000/api/user/email?email=${actualUser}`);
      const id_user = user.data[0].id;
      console.log(user)
      if (user) {
        // Comprobar si está en favoritos
        if (!isFavorite) {
          // MIRAR SI YA ESTÁ EN NUESTRA BBDD
          const gameExists = await axios(`http://localhost:3000/api/videogame/${id_game}`);
          console.log("GAME EXISTS")
          console.log(gameExists)
          // Si el juego no existe...
          if (!gameExists.data) {
            // CREAR JUEGO EN NUESTRA BBDD
            await axios({
              method: 'post',
              url: 'http://localhost:3000/api/videogame',
              data: { id, name, background_image },
              withCredentials: true
            });
          }

          // MARCAR COMO FAVORITO
          const date = new Date().toISOString().split('T')[0];
          //  (habrá middlewares en la ruta por lo que comprueba el token)
          await axios({
            method: 'post',
            url: 'http://localhost:3000/api/favorites/',
            data: { id_user, id_game, date },
            withCredentials: true
          });

          updateFavsUser([...favsUser, { id_game, name }]);
        } else {
          await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/favorites/',
            data: { id_user, id_game },
          });
          updateFavsUser(favsUser.filter(fav => fav.id_game !== id_game));
        }
        setIsFavorite(!isFavorite);
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
              <h6>{isFavorite ? 'UNMARK FAVORITE' : 'MARK FAVORITE'}</h6>
              <FontAwesomeIcon icon={faHeart} size="sm" />
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

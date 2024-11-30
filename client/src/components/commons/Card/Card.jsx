import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

const Card = (game) => {
  const navigate = useNavigate();
  const { name, background_image, id, metacritic, slug, description } = game.data;
  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";

  const details = () => {
    navigate(`/games/${slug}`)
  }

  return <>
    <article className="cardVideogame" id={id} onClick={details} >
      <div>
        <img src={background_image} alt={name} />
      </div>
      <div className="gameData">
        <div>
          <h3>{name}</h3>
          <div className={`containerMetacritic ${colorMetacritic}`}>
            <h6>{metacritic}</h6>
          </div>
        </div>
        <p>Poner más cosas</p>
      </div>
      <div className="markers">
        <FontAwesomeIcon icon={fullHeart} />
        <FontAwesomeIcon icon={emptyHeart} />
      </div>
    </article>
  </>;
};

export default Card;

import React from "react";
import { useNavigate } from "react-router-dom";

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
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </article>
  </>;
};

export default Card;

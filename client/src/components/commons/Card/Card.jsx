import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (game) => {
  const navigate = useNavigate();
  const { name, background_image, id, metacritic, slug } = game.data;
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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
          In condimentum facilisis porta. Sed nec diam eu diam mattis viverra nulla fringilla, nunc tristique.
          Curabitur venenatis eros et felis bibendum, a efficitur sem malesuada.</p>
      </div>
    </article>
  </>;
};

export default Card;
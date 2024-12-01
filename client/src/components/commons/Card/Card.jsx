import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (game) => {
  const navigate = useNavigate();
  const { name, background_image, id, metacritic, slug, released, parent_platforms } = game.data;

  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";

  let arrayPlatforms = parent_platforms.map(platform => platform.name)
  const renderPlatforms = () => {
    return arrayPlatforms.map((platform, i) => <p>Hola</p>)
  }

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
        <div>
          <p><strong>Released:</strong> {released}</p>
          {renderPlatforms}
        </div>
      </div>
    </article>
  </>;
};

export default Card;

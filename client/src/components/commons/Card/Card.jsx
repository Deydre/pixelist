import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (game) => {
  const navigate = useNavigate();
  const { name, background_image, id, metacritic, slug, released, parent_platforms, genres } = game.data;
  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";

  const renderPlatforms = () => {
    return parent_platforms.map((platform, i) => <section><p>{platform.platform.name}</p></section>)
  }

  const renderGenres = () => {
    return genres.map((genre, i) => <section><p>{genre.name}</p></section>)
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

export default Card;

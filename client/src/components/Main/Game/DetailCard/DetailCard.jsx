import React from "react";

const DetailCard = (game) => {
  console.log(game)
  const { name, background_image, id, metacritic } = game.data;
  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";

  return <>
    <article className="cardDetailVideogame" id={id}>
      <div id="detailDivImg" style={{ backgroundImage: `url(${background_image})` }}>
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

export default DetailCard;

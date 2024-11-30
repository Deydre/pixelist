import React from "react";

const DetailCard = (game) => {
  console.log(game)
  const { name, background_image, id, metacritic, description_raw } = game.data;
  let colorMetacritic;
  metacritic >= 75 ? colorMetacritic = "green" : metacritic >= 50 ? colorMetacritic = "yellow" : colorMetacritic = "red";

  return <>
    <article className="cardDetailVideogame" id={id}>
      <div id="divImg">
        <img src={background_image} alt={name} />
      </div>
      <div id="divData">
        <div>
          <h2>{name}</h2>
          <div className={`containerMetacritic ${colorMetacritic}`}>
            <h6>{metacritic}</h6>
          </div>
        </div>
        <div>
          <p>{description_raw}</p>
        </div>
      </div>


    </article>
  </>;
};

export default DetailCard;
